
import React from 'react'
import { FaRegUser } from 'react-icons/fa'
import { SlSocialInstagram } from 'react-icons/sl'

type InputProps = {
    Firstname: string,
    Lastname: string,
    Username: string,
    socialMediaLink: string,
    OnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>, field: string) => void
}

export default function UserFields({ Firstname, Lastname, Username, socialMediaLink, OnChangeHandler }: InputProps) {


    return (
        <>
            <div className="flex flex-col">
                <label className="text-xs text-gray-500 ml-1 mb-1">Firstname</label>
                <input placeholder="Firstname" type="text" defaultValue={Firstname} onChange={(e) => OnChangeHandler(e, "firstname")}
                    className="bg-slate-800 hover:bg-slate-700 pl-4 py-5 rounded-md text-left text-white focus:outline-none" />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 ml-1 mb-1">Lastname</label>
                <input placeholder="Lastname" type="text" defaultValue={Lastname} onChange={(e) => OnChangeHandler(e, "lastname")}
                    className="bg-slate-800 hover:bg-slate-700 pl-4 py-5 rounded-md text-left text-white focus:outline-none" />
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 ml-1 mb-1">Permanent Username</label>
                <div className="flex items-center bg-slate-800 hover:bg-slate-700 rounded-md ">
                    <FaRegUser className="ml-3 text-slate-500 h-4 w-4" />
                    <input placeholder="Registered Username" type="text" defaultValue={Username} onChange={(e) => OnChangeHandler(e, "username")}
                        readOnly={true} className="bg-transparent w-full pl-3 py-5 text-slate-500 focus:outline-none" />
                </div>
            </div>

            <div className="flex flex-col">
                <label className="text-xs text-gray-500 ml-1 mb-1">Social Link (LinkedIn, Instagram etc) </label>
                <div className="flex items-center bg-slate-800 hover:bg-slate-700 rounded-md">
                    <SlSocialInstagram className="ml-3 text-slate-500 h-6 w-6" />
                    <input placeholder="Social Link (LinkedIn, Instagram etc)" type="text" defaultValue={socialMediaLink} onChange={(e) => OnChangeHandler(e, "socialMediaLink")}
                        className="bg-transparent w-full pl-3 py-5 text-white focus:outline-none" />
                </div>
            </div>
        </>
    )
}
