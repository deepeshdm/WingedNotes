import React from 'react'
import { FaRegUser } from 'react-icons/fa'
import { SlSocialInstagram } from 'react-icons/sl'
import { Dispatch, SetStateAction } from 'react'
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'


type InputFieldsType = {
    showPassword: boolean,
    setFirstname: Dispatch<SetStateAction<string | undefined>>,
    setLastname: Dispatch<SetStateAction<string | undefined>>,
    setUsername: Dispatch<SetStateAction<string | undefined>>,
    setsocialLink: Dispatch<SetStateAction<string | undefined>>,
    setshowPassword: Dispatch<SetStateAction<boolean>>,
    setPasswordInput: Dispatch<SetStateAction<string | undefined>>,
    setCPasswordInput: Dispatch<SetStateAction<string | undefined>>
}


export default function InputFields({ showPassword, setFirstname, setLastname, setUsername,
    setsocialLink, setshowPassword, setPasswordInput, setCPasswordInput }: InputFieldsType) {

    return (
        <>

            <div className="flex flex-col">
                <label className="text-slate-700 text-sm ml-2 mb-1"> Firstname </label>
                <input placeholder="Enter Firstname" type="text"
                    onChange={(e) => setFirstname(String(e.target.value))} maxLength={64}
                    className="bg-slate-800 hover:bg-slate-700 pl-4 py-5 rounded-md text-left text-white focus:outline-none" />
            </div>

            <div className="flex flex-col">
                <label className="text-slate-700 text-sm ml-2 mb-1"> Lastname </label>
                <input placeholder="Enter Lastname" type="text"
                    onChange={(e) => setLastname(String(e.target.value))} maxLength={64}
                    className="bg-slate-800 hover:bg-slate-700 pl-4 py-5 rounded-md text-left text-white focus:outline-none" />
            </div>


            <div className="flex flex-col">
                <label className="text-slate-700 text-sm ml-2 mb-1"> Username </label>
                <div className="flex items-center bg-slate-800 hover:bg-slate-700 rounded-md">
                    <FaRegUser className="ml-3 text-slate-500 h-4 w-4" />
                    <input placeholder="Enter Username" type="text"
                        onChange={(e) => setUsername(String(e.target.value))} maxLength={30}
                        className="bg-transparent w-full pl-3 py-5 text-white focus:outline-none" />
                </div>
            </div>

            <div className="flex flex-col">
                <label className="text-slate-700 text-sm ml-2 mb-1"> SocialMedia Link </label>
                <div className="flex items-center bg-slate-800 hover:bg-slate-700 rounded-md">
                    <SlSocialInstagram className="ml-3 text-slate-500 h-6 w-6" />
                    <input placeholder="Social Link (LinkedIn, Instagram etc)" type="text"
                        onChange={(e) => setsocialLink(String(e.target.value))} maxLength={64}
                        className="bg-transparent w-full pl-3 py-5 text-white focus:outline-none" />
                </div>
            </div>

            <div className="flex flex-col">
                <label className="text-slate-700 text-sm ml-2 mb-1"> Password </label>
                <div className="flex items-center bg-slate-800 hover:bg-slate-700 rounded-md">
                    <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                    <input placeholder="Enter Password" type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setPasswordInput(String(e.target.value))} maxLength={64}
                        className="bg-transparent w-full pl-3 py-5 text-white focus:outline-none" />
                    {
                        showPassword ?
                            (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(false)} />) :
                            (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(true)} />)
                    }
                </div>
            </div>

            <div className="flex flex-col">
                <label className="text-slate-700 text-sm ml-2 mb-1"> Confirm password </label>
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
        </>
    )


}


