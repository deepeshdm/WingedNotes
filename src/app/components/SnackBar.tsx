
// Define Custom Snackbar/Toast component

import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import { Alert, AlertColor } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

type SnackProps = {
    openSnackbar: boolean,
    setopenSnackbar: Dispatch<SetStateAction<boolean>>,
    snackMessage: string,
    severity: AlertColor,
    autoHideDuration: number,  // AutoHide in Secs
    position: { vertical: "top" | "bottom", horizontal: "center" | "left" | "right" }
}

function TransitionDown(props: any) {
    return <Slide {...props} direction="down" />;
}

const SnackBar = ({ openSnackbar, setopenSnackbar, snackMessage, severity, autoHideDuration, position }: SnackProps) => {

    // Executed when snackbar closes on it's own
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') { return };
        setopenSnackbar(false);
    };


    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={position} // Snackbar Position
            TransitionComponent={TransitionDown}>
            <Alert severity={severity} variant="filled" sx={{ width: '100%' }}>
                {snackMessage}
            </Alert>
        </Snackbar>
    )
}

export default SnackBar;