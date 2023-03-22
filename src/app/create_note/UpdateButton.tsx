
'use client'

import { updatePost } from '@/db_utils';
import { AlertColor } from '@mui/material';
import { BsFillArrowUpSquareFill } from "react-icons/bs"
import { useMediaQuery } from '@mui/material';

type ButtonProps = {
  noteData: { title: string; body: string },
  postId: string,
  loggedInUser: string,
  disableUpdateButton: boolean,
  setDisableUpdateButton: React.Dispatch<React.SetStateAction<boolean>>,
  setSnackbarState: (message: string, severity: AlertColor, open: boolean) => void
}


export const UpdateButton = ({ noteData, postId, loggedInUser, disableUpdateButton, setDisableUpdateButton, setSnackbarState }: ButtonProps) => {

  const isSmallScreen = useMediaQuery('(max-width:450px)');

  // Update the state to Database when Update Button clicked
  const OnClickHandler = () => {

    if (disableUpdateButton) {
      return
    }

    console.log("Updating the Post !")
    updatePost(loggedInUser, postId, noteData)                        // Update Post
    setSnackbarState("Post Updated Successfully !", "success", true);  // Show Snackbar
    setDisableUpdateButton(true)                                          // Disable Button
    console.log("Post updated successfully !")
  }

  if (isSmallScreen) {
    return (
      <div className="max-[500px]:px-4 max-[500px]:ml-4">
        <BsFillArrowUpSquareFill onClick={OnClickHandler}
          className={`text-sky-500 hover:text-sky-600 active:text-sky-500 cursor-pointer w-9 h-8 
              ${disableUpdateButton ? 'opacity-50 cursor-not-allowed' : ''} `}
        />
      </div>
    );
  }

  return (
    <>
      <button
        onClick={OnClickHandler}
        disabled={disableUpdateButton}
        className=" bg-sky-500 text-white font-bold px-7 py-2 rounded-md hover:bg-sky-600 active:bg-sky-700 
                disabled:opacity-50 disabled:cursor-not-allowed ml-8 max-[500px]:px-4 max-[500px]:ml-5">
        UPDATE
      </button>

    </>
  )
}