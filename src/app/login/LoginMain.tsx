
"use client"

import Link from "next/link";
import { Raleway } from "@next/font/google";
import SnackBar from "../components/SnackBar";
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { pink } from '@mui/material/colors';
import { AlertColor } from '@mui/material';
import { FaRegUser } from 'react-icons/fa'
import { ClipLoader } from "react-spinners";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
const ralewayFont = Raleway({ weight: '700', subsets: ['latin'] });  // Import 'Raleway' Google Font
const IntroStyles = `text-white font-bold text-3xl text-center mb-10 ${ralewayFont.className}`;

//-----------------------------------------------------------------------------------------------

export default function LoginMain() {

    const router = useRouter();
    const [username, setUsernameInput] = useState<string>()
    const [password, setPasswordInput] = useState<string>()
    const [openSnackbar, setopenSnackbar] = useState<boolean>(false);
    const [loginClicked, setLoginClicked] = useState<boolean>(false);
    const [showPassword, setshowPassword] = useState<boolean>(false);
    const [stayLoggedIn, setStayLoggedIn] = useState<boolean>(true);
    const [snackMessage, setSnackMessage] = useState<string>('')
    const [snackSeverity, setSnackSeverity] = useState<AlertColor>('info')

    //------------------------------------------------------------------------------------

    // set snackbar state
    function setSnackbarState(message: string, severity: AlertColor, open: boolean) {
        setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
    }


    // Event handler for Login Button
    const loginHandler = async () => {

        setLoginClicked(true)

        // check if fields are null
        if (!username || !password) {
            setSnackbarState("Please fill all values !", "warning", true);
            setLoginClicked(false)
            return
        }

        // Verify if user account exists & match passwords
        const userValid = await fetch('/api/user-auth', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password, stayLoggedIn: stayLoggedIn })
        }).then(res => res.json()).then(data => data.accountVerified)

        if (userValid) {
            setSnackbarState("Account Verified !", "success", true)
            // redirect to /home after 100 milisecs
            setTimeout(() => {
                setLoginClicked(false)
                router.push('/home')
            }, 500)
            return
        }

        setLoginClicked(false)
        setSnackbarState("Username or Password Incorrect ! Try again", "error", true)
        return;

    }

    //------------------------------------------------------------------------------------


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <>

            <div className="bg-gray-900 min-h-screen pt-7 flex flex-col items-center">

                <h1 className={IntroStyles}> Login Account </h1>
                <div className="flex flex-col w-1/4">
                    <label className="text-slate-700 text-sm ml-2 mb-1"> Registered Username </label>
                    <div className="flex items-center bg-slate-800 hover:bg-slate-700 rounded-md mb-5">
                        <FaRegUser className="ml-3 text-slate-500 h-4 w-4" />
                        <input placeholder="Username" type="text" onChange={(e) => setUsernameInput(String(e.target.value))} maxLength={64}
                            className="bg-transparent w-full pl-3 py-5 text-white focus:outline-none" />
                    </div>
                </div>


                <div className="flex flex-col w-1/4">
                    <label className="text-slate-700 text-sm ml-2 mb-1"> Password </label>
                    <div className="flex items-center bg-slate-800 hover:bg-slate-700 rounded-md">
                        <RiLockPasswordLine className="ml-3 text-slate-500 h-6 w-6" />
                        <input placeholder="Password" type={showPassword ? 'text' : 'password'} onChange={(e) => setPasswordInput(String(e.target.value))} maxLength={64}
                            className="bg-transparent w-full pl-3 py-5 text-white focus:outline-none" />
                        {showPassword ?
                            (<RiEyeOffLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(false)} />) :
                            (<RiEyeLine className="mr-7 text-slate-500 h-7 w-7 cursor-pointer" onClick={() => setshowPassword(true)} />)
                        }
                    </div>
                </div>


                <FormGroup className="mr-52 mt-2">
                    <FormControlLabel control={<Checkbox {...label} defaultChecked sx={{ color: pink[800], '&.Mui-checked': { color: pink[600] } }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setStayLoggedIn(event.target.checked) }} />}
                        className="text-slate-500 text-base" label="Stay Logged In" />
                </FormGroup>


                <button onClick={loginHandler}
                    className="h-14 max-h-14 w-40  bg-sky-500 text-white font-bold px-14 py-4 mt-3 rounded-md hover:bg-sky-600 active:bg-sky-700">
                    {loginClicked ? <ClipLoader color="#ffffff" loading={true} size={30} /> : "LOGIN"}
                </button>


                <div>
                    <p className="text-slate-500 text-center text-base mt-10"> Don't have an account ? </p>
                    <Link href="/signup">
                        <p className="text-white text-center text-lg font-semibold hover:font-bold"> create account </p>
                    </Link>
                </div>


            </div>

            <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
                snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={1000}
                position={{ vertical: "top", horizontal: "right" }} />
        </>
    );
};

