
import React from 'react'
import { Dispatch, SetStateAction } from 'react'
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

type DialogboxType = {
    numNotes: number,
    showPassword: boolean,
    setPasswordInput: Dispatch<SetStateAction<string>>,
    setshowPassword: Dispatch<SetStateAction<boolean>>,
    deleteAllHandler: () => Promise<void>,
    setDeleteAllClicked: Dispatch<SetStateAction<boolean>>,
}

export default function DeleteDialogbox({ numNotes, showPassword, setPasswordInput,
    setshowPassword, deleteAllHandler, setDeleteAllClicked }: DialogboxType) {

    return (
        <>
            <div className="z-50 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white w-96 p-5 rounded-md shadow-lg">
                    <p className="text-lg font-semibold mb-4"> Do you want to delete ALL {<span className='text-lg font-bold text-red-500'> {numNotes} </span>} Notes ? 🤯 </p>

                    <div className="mb-4">
                        <label className="block text-sm text-black font-bold mb-2"> Confirm Password </label>
                        <div className="flex items-center bg-neutral-200 hover:bg-neutral-300 rounded-md">
                            <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                            <input placeholder="Password" type={showPassword ? 'text' : 'password'} onChange={(e) => setPasswordInput(String(e.target.value))} maxLength={64}
                                className="bg-transparent w-full pl-3 py-5 text-black focus:outline-none" />
                            {showPassword ?
                                (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(false)} />) :
                                (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(true)} />)
                            }
                        </div>
                    </div>

                    <div className="mt-10">
                        <button className="bg-red-500 hover:bg-red-600 active:bg-red-500 text-white px-4 py-2 rounded-md mr-3" onClick={deleteAllHandler}> DELETE ALL NOTES </button>
                        <button className="bg-gray-300 hover:bg-gray-400 active:bg-gray-300 text-gray-800 px-4 py-2 rounded-md float-right" onClick={() => setDeleteAllClicked(false)}> CANCEL </button>
                    </div>
                </div>
            </div>
        </>
    )
}
