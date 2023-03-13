
"use client"

import React from 'react';
import { deleteNote } from '@/db_utils';
const jwt = require('jsonwebtoken');
import HomeNavbar from '../components/HomeNavbar';
import { AlertColor } from '@mui/material';
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { DocumentData } from 'firebase/firestore';
import SnackBar from '../components/SnackBar';
import { TitleInput, NoteInput } from './InputFields';
import { UpdateButton } from './UpdateButton';


// NOTE : The 'forEdit' and 'postData' are only passed when coming from '/edit_note' to enable editing of note.
export default function CreateNoteMain({ PostId, forEdit, postData }:
    { PostId: string, forEdit?: boolean, postData?: DocumentData }) {

    const [openSnackbar, setopenSnackbar] = useState<boolean>(false);
    const [deleteIconClicked, setDeleteIconClicked] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('')
    const [snackSeverity, setSnackSeverity] = useState<AlertColor>('info')
    const [loggedUser, setLoggedUser] = useState('')
    const [disableUpdateButton, setDisableUpdateButton] = useState(true)
    const [noteData, setNoteData] = useState({ title: '', body: '', lastUpdated: '' });
    const router = useRouter();

    //---------------------------------------------------------------------------------

    // set snackbar state
    function setSnackbarState(message: string, severity: AlertColor, open: boolean) {
        setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
    }


    useEffect(() => {

        const TokenCookie = "JWTAuthToken"
        const token = Cookies.get(TokenCookie)

        // If JWT cookie does'nt exist on browser redirect /login
        if (!token) {
            console.log("JWT Cookie does'nt exist, redirecting...")
            router.push("/login")
        }

        const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
        const result = jwt.verify(token, SECRET_KEY);
        const loggedUser = result.loggedUser;
        console.log("I AM LOGGEDIN AS : ", loggedUser)
        setLoggedUser(loggedUser)

        // Set the Note data if Edit is true (coming from /edit_note)
        if (forEdit && postData) {
            console.log("ForEdit is True, setting NoteData Now !")
            setNoteData({ title: postData.title, body: postData.body, lastUpdated: postData.lastUpdated })
        }


    }, [])



    const deleteCurrentNote = async () => {

        // Delete the current Note
        const isDeleted = await deleteNote(loggedUser, PostId);

        if (isDeleted) {
            setSnackbarState("Note Deleted Successfully !", "success", true);
            setTimeout(() => {
                router.push("/home")
            }, 1500)
        } else {
            setSnackbarState("Note Deletion Failed !", "error", true);
        }

    }

    //---------------------------------------------------------------------------------

    return (
        <>
            <div className="bg-gray-900 min-h-screen">
                <HomeNavbar LoggedInUser={loggedUser} />
                <div className="mx-20 mt-10 pb-16 flex flex-col gap-y-5">
                    <TitleInput noteData={noteData} setNoteData={setNoteData} setDisableUpdateButton={setDisableUpdateButton}
                        setDeleteIconClicked={setDeleteIconClicked}>
                        <UpdateButton noteData={noteData} postId={PostId} loggedInUser={loggedUser} disableUpdateButton={disableUpdateButton}
                            setDisableUpdateButton={setDisableUpdateButton} setSnackbarState={setSnackbarState} />
                    </TitleInput>
                    <NoteInput noteData={noteData} setNoteData={setNoteData} setDisableUpdateButton={setDisableUpdateButton} />
                </div>

            </div>


            {/* Confirmation DialogBox */}
            {deleteIconClicked &&
                <div onClick={() => setDeleteIconClicked(false)} className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-96 p-5 rounded-md shadow-lg">
                        <p className="text-lg font-semibold mb-4"> Do you want to delete this Note ? </p>
                        <div className="flex justify-end">
                            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-3" onClick={deleteCurrentNote}> DELETE NOTE </button>
                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md" onClick={() => setDeleteIconClicked(false)}> CANCEL </button>
                        </div>
                    </div>
                </div>
            }

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={1000}
                position={{ vertical: "top", horizontal: "center" }} />
        </>
    );
}

