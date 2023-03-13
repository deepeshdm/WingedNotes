
"use client"

import React, { useState } from 'react'
import { IoLogOut } from 'react-icons/io5'
import { FaKey } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'


// Clears Token Cookie from Browser
function clearSession(router: AppRouterInstance) {
    const TokenCookie = "JWTAuthToken"
    const token = Cookies.get(TokenCookie)
    console.log("STOREDCOOKIE : ", token)

    if (token) {
        // Remove cookie
        Cookies.remove(TokenCookie)
    }
    router.push("/login")
}


type DialogBoxType = {
    router: AppRouterInstance,
    setButtonActive: React.Dispatch<React.SetStateAction<boolean>>
}


const LogoutDialogBox = ({ router, setButtonActive }: DialogBoxType) => {
    return (
        <>
            <div onClick={() => setButtonActive(false)} className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white w-96 p-5 rounded-md shadow-lg">
                    <p className="text-lg font-semibold mb-4">Are you sure you want to logout ? 🙋‍♂️</p>
                    <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-3"
                            onClick={() => clearSession(router)}>Yes</button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                            onClick={() => setButtonActive(false)}>No</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default function ActionButtons() {

    const router = useRouter()
    const [buttonActive, setButtonActive] = useState(false)

    return (
        <>
            <div onClick={() => router.push("/change_password")}
                className="flex items-end justify-center py-4 px-5 mt-3 rounded-md bg-sky-500 hover:bg-sky-600 active:bg-sky-700 cursor-pointer select-none">
                <span className='text-white text-base font-semibold'> CHANGE PASSWORD </span>
                <span className="ml-3"> <FaKey className='w-6 h-6 text-white' /> </span>
            </div>

            <div onClick={() => router.push("/delete_account")}
                className="flex items-end justify-center py-4 px-5 rounded-md bg-red-500 hover:bg-red-600 active:bg-red-700 cursor-pointer select-none">
                <span className='text-white text-base font-semibold'> DELETE ACCOUNT </span>
                <span className="ml-3"> <MdDelete className='w-6 h-6 text-white' /> </span>
            </div>

            <div onClick={() => setButtonActive(true)}
                className={`flex items-end justify-center py-4 px-5 rounded-md bg-indigo-500 hover:bg-indigo-600 ${buttonActive ? "bg-red-700" : "active:bg-indigo-700"} cursor-pointer select-none`}>
                <span className='text-white text-base font-semibold'> LOGOUT </span>
                <span className="ml-3"> <IoLogOut className='w-6 h-6 text-white' /> </span>
            </div>

            {buttonActive &&
                <LogoutDialogBox router={router} setButtonActive={setButtonActive} />
            }

        </>
    )
}

