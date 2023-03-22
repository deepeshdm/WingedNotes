
"use client"

import React from 'react'
const crypto = require('crypto');
import HomeNavbar from "../components/HomeNavbar";
import SnackBar from '../components/SnackBar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock } from 'react-icons/fa'
import { AlertColor } from '@mui/material';
import { isPasswordCorrect, changeUserPassword } from '../../db_utils';
import Cookies from 'js-cookie'
const jwt = require('jsonwebtoken');
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'


export default function ChangePasswordMain() {

    const router = useRouter()
    const [OldPassword, setOldPassword] = useState<string>()
    const [NewPassword, setNewPassword] = useState<string>()
    const [ConfirmNewPassword, setConfirmNewPassword] = useState<string>()
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [LoggedInUser, setLoggedInUser] = useState<string>('')
    const [openSnackbar, setopenSnackbar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('')
    const [snackSeverity, setSnackSeverity] = useState<AlertColor>('info')

    //--------------------------------------------------------------------------------

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


    // Event handler, changes password account of given user.
    async function ChangePassword(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {

        // Check for Null field values 
        if (!OldPassword || !ConfirmNewPassword || !NewPassword) {
            setSnackbarState("Please fill all values !", "warning", true)
            return;
        }

        // Check if both new password fields match
        if (NewPassword !== ConfirmNewPassword) {
            setSnackbarState("New Passwords Don't Match !", "warning", true)
            return;
        }

        // Check if both new password fields match
        if (OldPassword == NewPassword) {
            setSnackbarState("New Password is same as Old Password !", "warning", true)
            return;
        }

        // Check if given password matches account password
        const OldHashPassword = crypto.createHash('sha256').update(OldPassword).digest('hex'); // Hash Password
        const isValid = await isPasswordCorrect(LoggedInUser, OldHashPassword)
        if (!isValid) {
            setSnackbarState("Old Password is Incorrect !", "warning", true)
            return;
        }

        // Change the user password
        const NewHashPassword = crypto.createHash('sha256').update(NewPassword).digest('hex'); // Hash Password
        const isPassUpdated = await changeUserPassword(LoggedInUser, NewHashPassword);

        if (isPassUpdated) {
            setSnackbarState("Password Updated Sucessfully !", "success", true)
            setTimeout(() => {
                router.push("/home")
                return;
            }, 2000)
            return;
        } else {
            setSnackbarState("Password Updation Failed !", "error", true)
            return;
        }

    }

    //-----------------------------------------------------------------------------------------

    return (
        <>
            <HomeNavbar LoggedInUser={LoggedInUser} />

            <div className="bg-gray-900 min-h-screen pt-7 flex flex-col items-center">

                <FaLock className='text-white mb-3 max-[450px]:w-5 max-[450px]:h-5 w-7 h-7' />
                <p className='max-[450px]:text-xl text-2xl mb-8 font-semibold text-white'> Change Account Password </p>

                <div className="flex items-center  bg-slate-800 hover:bg-slate-700 rounded-md mb-5">
                    <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                    <input placeholder="Enter Old Password" type={showOldPassword ? 'text' : 'password'}
                        onChange={(e) => setOldPassword(String(e.target.value))} maxLength={64}
                        className="bg-transparent max-[450px]:w-3/4 w-full pl-3 py-5 text-white focus:outline-none" />
                    {showOldPassword ?
                        (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setShowOldPassword(false)} />) :
                        (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setShowOldPassword(true)} />)
                    }
                </div>


                <div className="flex items-center  bg-slate-800 hover:bg-slate-700 rounded-md mb-5">
                    <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                    <input placeholder="Enter New Password" type={showNewPassword ? 'text' : 'password'}
                        onChange={(e) => setNewPassword(String(e.target.value))} maxLength={64}
                        className="bg-transparent max-[450px]:w-3/4 w-full pl-3 py-5 text-white focus:outline-none" />
                    {showNewPassword ?
                        (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setShowNewPassword(false)} />) :
                        (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setShowNewPassword(true)} />)
                    }
                </div>


                <div className="flex items-center bg-slate-800 hover:bg-slate-700 rounded-md mb-5">
                    <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                    <input placeholder="Confirm New Password" type={showNewPassword ? 'text' : 'password'}
                        onChange={(e) => setConfirmNewPassword(String(e.target.value))} maxLength={64}
                        className="bg-transparent max-[450px]:w-3/4 w-full pl-3 py-5 text-white focus:outline-none" />
                    {showNewPassword ?
                        (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setShowNewPassword(false)} />) :
                        (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setShowNewPassword(true)} />)
                    }
                </div>


                <button onClick={ChangePassword}
                    className="bg-sky-500 text-white text-md font-bold max-[450px]:px-10 px-14 py-4 mt-3 rounded-md hover:bg-sky-600 active:bg-sky-700">
                    CHANGE PASSWORD </button>

            </div>

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={2000}
                position={{ vertical: "top", horizontal: "center" }} />
        </>
    )
}
