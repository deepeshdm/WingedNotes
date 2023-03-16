import React from 'react'
import { Dispatch, SetStateAction } from 'react'

type DialogboxType = {
    username: string | undefined,
    RegisterNewUser: () => Promise<void>,
    setButtonActive: Dispatch<SetStateAction<boolean>>
}

export default function SignupDialogbox({ username, RegisterNewUser, setButtonActive }: DialogboxType) {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white w-fit p-5 rounded-md shadow-lg m-7">
                    <p className="text-lg font-semibold mb-4"> Register Account for <span className="font-bold">"{username}"</span> ? 👤</p>

                    <div className="flex items-center bg-red-200 rounded-md px-5 py-3">
                        <p className="text-sm text-red-400 font-medium">⚠️WARNING : Username cannot be changed later !</p>
                    </div>

                    <div className="mt-7">
                        <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md mr-3" onClick={RegisterNewUser}> CREATE ACCOUNT </button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md float-right" onClick={() => setButtonActive(false)}> CANCEL </button>
                    </div>
                </div>
            </div>
        </>
    )
}
