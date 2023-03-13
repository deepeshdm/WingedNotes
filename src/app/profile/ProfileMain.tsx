
'use client'

import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { AlertColor } from '@mui/material/Alert';
import ActionButtons from './ActionButtons';
import UserFields from './UserFields';
import { updateUserFields } from '@/db_utils';
import SnackBar from '../components/SnackBar';
import { DocumentData } from 'firebase/firestore';

type ProfileProps = {
    LoggedInUser: string,
    userDoc: DocumentData | undefined
}

export default function ProfileMain({ LoggedInUser, userDoc }: ProfileProps) {

    const [Firstname, setFirstname] = useState<string>(userDoc?.Firstname)
    const [Lastname, setLastname] = useState<string>(userDoc?.Lastname)
    const [Username, setUsername] = useState<string>(userDoc?.Username)
    const [SocialMediaLink, setSocialMediaLink] = useState<string>(userDoc?.socialMediaLink)
    const [disableButton, setDisableButton] = useState<boolean>(true)
    const [openSnackbar, setopenSnackbar] = useState<boolean>(false);
    const [snackMessage, setSnackMessage] = useState<string>('')
    const [snackSeverity, setSnackSeverity] = useState<AlertColor>('info')

    //------------------------------------------------------------------------------

    // set snackbar state
    function setSnackbarState(message: string, severity: AlertColor, open: boolean) {
        setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
    }


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        switch (field) {
            case 'firstname':
                setFirstname(event.target.value)
                break
            case 'lastname':
                setLastname(event.target.value)
                break
            case 'username':
                setUsername(event.target.value)
                break
            case 'socialMediaLink':
                setSocialMediaLink(event.target.value)
                break
            default:
                break
        }

        // Enable Button since Input has changed, allow user to update data.
        setDisableButton(false)
    }


    // Update Button handler Updates current fields in database
    const UpdateInputFields = async () => {

        const fieldsToUpdate = {
            Firstname: Firstname,
            Lastname: Lastname,
            Username: Username,
            socialMediaLink: SocialMediaLink
        }

        const isUpdated = await updateUserFields(LoggedInUser, fieldsToUpdate)
        if (isUpdated) {
            setSnackbarState("Fields Updated Successfully !", "success", true)
            setDisableButton(true)
        } else {
            setSnackbarState("Fields Updation Failed !", "error", true)
        }
    }

    //----------------------------------------------------------------------------

    return (
        <>


            <div className="bg-gray-900 min-h-screen">

                <div className='flex flex-col items-center'>
                    <FaUser className='text-white mb-3 w-7 h-7' />
                    <p className='text-2xl mb-8 font-semibold text-white'> Account Details </p>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-5 mx-[410px]">
                    <UserFields Firstname={userDoc?.Firstname} Lastname={userDoc?.Lastname} OnChangeHandler={handleInputChange}
                        Username={userDoc?.Username} socialMediaLink={userDoc?.socialMediaLink} />
                    <button disabled={disableButton} onClick={UpdateInputFields}
                        className="bg-sky-500 text-white font-bold px-14 py-4 mt-3 rounded-md hover:bg-sky-600 active:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        UPDATE
                    </button>
                    <ActionButtons />
                </div>

            </div>

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={1000}
                position={{ vertical: "top", horizontal: "center" }} />
        </>
    )
}
