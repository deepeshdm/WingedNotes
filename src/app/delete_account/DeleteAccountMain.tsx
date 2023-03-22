
"use client"

import React from 'react'
const crypto = require('crypto');
import HomeNavbar from "../components/HomeNavbar";
import SnackBar from '../components/SnackBar';
import { Raleway, Roboto } from "@next/font/google"; // Import Google Fonts
import Image from 'next/image';
import { AlertColor } from '@mui/material';
import { MdDelete } from 'react-icons/md'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import DeleteAccountDialogBox from './DeleteAccountDialogBox';
import { isPasswordCorrect, deleteUserAccount, deleteAllNotes } from '@/db_utils';
const jwt = require('jsonwebtoken');
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
const ralewayFont = Raleway({ weight: '700', subsets: ['latin'] });
const robotoFont = Roboto({ weight: '100', subsets: ['latin'] });


export default function DeleteAccountMain() {

    const router = useRouter()
    const [buttonActive, setButtonActive] = useState<boolean>(false)
    const [password, setPasswordInput] = useState<string>('')
    const [confirmPassword, setCPasswordInput] = useState<string>('')
    const [confirmationText, setConfirmationText] = useState<string>('')
    const [showPassword, setshowPassword] = useState<boolean>(false);
    const [LoggedInUser, setLoggedInUser] = useState<string>('')
    const [openSnackbar, setopenSnackbar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('')
    const [snackSeverity, setSnackSeverity] = useState<AlertColor>('info')

    //---------------------------------------------------------------------------------

    // set snackbar state
    function setSnackbarState(message: string, severity: AlertColor, open: boolean) {
        setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
    }


    useEffect(() => {
        // Access the JWT cookie on browser
        const TokenCookie = "JWTAuthToken"
        const token = Cookies.get(TokenCookie)
        console.log("STOREDCOOKIE : ", token)
        if (token) {
            const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
            const result = jwt.verify(token, SECRET_KEY);
            setLoggedInUser(result.loggedUser)
        } else {
            console.log("JWT Cookie does'nt exist, redirecting to login !")
            router.push("/login")
        }
    }, [])


    // Event handler for Dialogbox, Delete the account of given user.
    async function deleteAccountHandler() {

        // Check for Null field values 
        if (!password || !confirmPassword) {
            setSnackbarState("Please fill all values !", "warning", true)
            return;
        }

        // Check if both password fields match
        if (password !== confirmPassword) {
            setSnackbarState("Passwords Don't Match !", "warning", true)
            return;
        }

        // Check if given password matches account password
        const HashPassword = crypto.createHash('sha256').update(password).digest('hex'); // Hash Passwrd
        const isValid = await isPasswordCorrect(LoggedInUser, HashPassword)
        if (!isValid) {
            setSnackbarState("Password is Incorrect !", "error", true)
            return;
        }

        // Show Confirmation Dialogbox
        setButtonActive(true)

    }


    async function deleteAccount() {

        // Delete all notes and user account
        const allNotesDeleted = await deleteAllNotes(LoggedInUser)
        const isDeleted = await deleteUserAccount(LoggedInUser)

        if (isDeleted) {
            setButtonActive(false)
            // Clear JWT Cookie
            Cookies.remove('JWTAuthToken')
            router.push("/login")
            return;
        } else {
            setButtonActive(false)
            setSnackbarState("Account Deletion Failed !", "error", true)
            return;
        }
    }

    //---------------------------------------------------------------------------------

    return (
        <>
            <HomeNavbar LoggedInUser={LoggedInUser} />
            <div className="bg-gray-900 min-h-screen flex flex-col items-center">

                <p className={`max-sm:text-xl text-2xl mb-1 max-lg:mt-5 text-white ${ralewayFont.className}`}> Delete Account Permanently </p>
                <p className={`text-white text-center font-light max-sm:text-xs text-sm sm:text-base mx-5 min-[500px]:mx-14 lg:mx-44 min-[1100px]:mx-72 ${robotoFont.className}`}>
                    Before proceeding, please ensure that you have exported or saved any important data that you wish to keep.
                    Deleting your account will also delete all notes associated with it and it cannot be recovered.
                </p>

                <Image src="/inbox_cleanup.svg" alt=" " width={350} height={350} />


                <div className='flex flex-col sm:flex-row items-center gap-x-10 gap-y-5'>

                    <div className="flex items-center bg-slate-800 hover:bg-slate-700 rounded-md">
                        <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                        <input placeholder="Password" type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setPasswordInput(String(e.target.value))} maxLength={64}
                            className="bg-transparent w-full pl-3 py-5 text-white focus:outline-none" />
                        {
                            showPassword ?
                            (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(false)} />) :
                            (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(true)} />)
                        }
                    </div>

                    <div className="flex items-center bg-slate-800 hover:bg-slate-700 rounded-md">
                        <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                        <input placeholder="Confirm Password" type={showPassword ? 'text' : 'password'}
                            onChange={(e) => setCPasswordInput(String(e.target.value))} maxLength={64}
                            className="bg-transparent w-full pl-3 py-5 text-white focus:outline-none" />
                        {
                            showPassword ?
                            (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(false)} />) :
                            (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(true)} />)
                        }
                    </div>

                </div>

                <div onClick={deleteAccountHandler}
                    className="flex items-end py-4 px-5 mt-6 mb-20 rounded-md bg-red-500 hover:bg-red-600 active:bg-red-700 cursor-pointer select-none">
                    <span className='text-white text-base font-semibold'> DELETE ACCOUNT </span>
                    <span className="ml-3"> <MdDelete className='w-6 h-6 text-white' /> </span>
                </div>

            </div>


            {buttonActive &&
                <DeleteAccountDialogBox confirmationText={confirmationText} setButtonActive={setButtonActive}
                    deleteAccount={deleteAccount} setConfirmationText={setConfirmationText} />
            }

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={1000}
                position={{ vertical: "top", horizontal: "center" }} />
        </>
    )
}
