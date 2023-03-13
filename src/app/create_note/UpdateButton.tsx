
import { updatePost } from '@/db_utils';
import { AlertColor } from '@mui/material';

type ButtonProps = {
    noteData: { title: string; body: string },
    postId: string,
    loggedInUser: string,
    disableUpdateButton: boolean,
    setDisableUpdateButton: React.Dispatch<React.SetStateAction<boolean>>,
    setSnackbarState: (message: string, severity: AlertColor, open: boolean) => void
}


export const UpdateButton = ({ noteData, postId, loggedInUser, disableUpdateButton, setDisableUpdateButton, setSnackbarState }: ButtonProps) => {

    // Update the state to Database when Update Button clicked
    const OnClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("Updating the Post !")
        updatePost(loggedInUser, postId, noteData)                        // Update Post
        setSnackbarState("Post Updated Successfully !", "success", true);  // Show Snackbar
        setDisableUpdateButton(true)                                          // Disable Button
        console.log("Post updated successfully !")
    }

    return (
        <>
            <button
                onClick={OnClickHandler}
                disabled={disableUpdateButton}
                className="ml-10 bg-sky-500 text-white font-bold px-7 py-2 rounded-md hover:bg-sky-600 active:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed">
                UPDATE
            </button>

        </>
    )
}