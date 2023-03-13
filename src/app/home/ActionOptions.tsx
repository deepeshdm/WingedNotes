
"use client"

import React from 'react'
const crypto = require('crypto');
import { useState } from 'react'
import { AlertColor } from '@mui/material'
import { MdDelete } from 'react-icons/md'
import { IoIosCreate } from 'react-icons/io'
import { useRouter } from 'next/navigation'
import { deleteAllNotes } from '@/db_utils'
import SnackBar from '../components/SnackBar';
import { ClipLoader } from 'react-spinners';
import { isPasswordCorrect } from '@/db_utils'
import DeleteDialogbox from './DeleteDialogbox';


export default function ActionOptions({ TotalNotes, LoggedInUser }: { TotalNotes: string, LoggedInUser: string }) {

    const router = useRouter()
    const [numNotes, setNumNotes] = useState<number>(Number(TotalNotes))
    const [deleteAllClicked, setDeleteAllClicked] = useState<boolean>(false);
    const [isDeletingPosts, setIsDeletingPosts] = useState<boolean>(false);
    const [openSnackbar, setopenSnackbar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('')
    const [snackSeverity, setSnackSeverity] = useState<AlertColor>('info')
    const [showPassword, setshowPassword] = useState<boolean>(false);
    const [password, setPasswordInput] = useState<string>('')

    //------------------------------------------------------------------------------

    // set snackbar state
    function setSnackbarState(message: string, severity: AlertColor, open: boolean) {
        setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
    }

    // Delete all notes of the current user
    const deleteAllHandler = async () => {

        if (password.length === 0) {
            return
        }

        // Verify if password is correct
        const HashPassword = crypto.createHash('sha256').update(password).digest('hex'); // Hash Password
        const isValid = await isPasswordCorrect(LoggedInUser, HashPassword)

        if (isValid === false) {
            setSnackbarState("Password is Incorrect !", "error", true);
            return;
        }

        if (isValid === true) {

            setDeleteAllClicked(false)
            setIsDeletingPosts(true) // Show deleting dialogbox
            const isDeleted = await deleteAllNotes(LoggedInUser);

            if (isDeleted) {
                console.log("All Notes deleted !")
                setSnackbarState("All Notes Deleted Successfully !", "success", true);
                setNumNotes(0)
                // refresh the page
                setTimeout(() => {
                    setIsDeletingPosts(false)
                    window.location.reload();
                }, 1000)
            } else {
                console.log("Notes Deletion failed !")
                setIsDeletingPosts(false)
                setSnackbarState("Notes Deletion Failed !", "error", true);
            }
        }

    }

    //------------------------------------------------------------------------------

    return (
        <>
            <div className="flex items-center justify-between text-white mb-3 mx-60">
                <div className="flex items-center">
                    <span>All Notes (Total {numNotes} Notes)</span>
                </div>
                <div className="flex items-end">
                    <span onClick={() => router.push("/create_note")} className="mr-1 pb-1 cursor-pointer">
                        <IoIosCreate className='w-6 h-6' /> </span>
                    <button onClick={() => router.push("/create_note")}
                        className="hover:bg-slate-700 active:bg-slate-600 px-2 py-1 rounded-md cursor-pointer select-none">
                        Create Note </button>
                    <span className="mr-1 pb-1 ml-10"> <MdDelete className='w-6 h-6 text-red-500' /> </span>
                    <button onClick={() => setDeleteAllClicked(true)} disabled={numNotes < 1}
                        className="hover:bg-slate-700 active:bg-slate-600 px-2 py-1 rounded-md cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed ">
                        Delete All
                    </button>
                </div>
            </div>

            {/* Show DeleteAll Confirmation DialogBox */}
            {deleteAllClicked &&
                <DeleteDialogbox numNotes={numNotes} deleteAllHandler={deleteAllHandler}
                showPassword={showPassword} setshowPassword={setshowPassword}
                setPasswordInput={setPasswordInput} setDeleteAllClicked={setDeleteAllClicked} />
            }

            {/* Show Loading Spinner when Deleting All Posts */}
            {isDeletingPosts &&
                <div onClick={() => setIsDeletingPosts(false)} className="z-50 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-96 p-5 rounded-md shadow-lg flex flex-col items-center">
                        <p className="text-lg font-semibold mb-4"> Deleting All Posts.... </p>
                        <ClipLoader color="#0ea5e9" loading={true} size={50} />
                    </div>
                </div>
            }

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={1000}
                position={{ vertical: "top", horizontal: "center" }} />
        </>
    )
}
