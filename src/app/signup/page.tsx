
"use client"

import Link from "next/link";
import Navbar from "../components/NavBar";
import SnackBar from "../components/SnackBar";
import { Raleway } from "@next/font/google";
import { AlertColor } from '@mui/material';
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from 'next/navigation';
import InputFields from "./InputFields";
import SignupDialogbox from "./SignupDialogbox";
import { registerUser, userExists } from '../../db_utils'
const ralewayFont = Raleway({ weight: '700', subsets: ['latin'] });  // Import 'Raleway' Google Font
const IntroStyles = `text-white font-bold text-3xl text-center mb-10 ${ralewayFont.className}`;


//-------------------------------------------------------------------------------------------------------

export default function SignUp() {

  const router = useRouter();
  const [firstname, setFirstname] = useState<string>()
  const [lastname, setLastname] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [socialLink, setsocialLink] = useState<string>()
  const [password, setPasswordInput] = useState<string>()
  const [signupClicked, setSignupClicked] = useState<boolean>(false);
  const [confirmPassword, setCPasswordInput] = useState<string>()
  const [showPassword, setshowPassword] = useState<boolean>(false);
  const [openSnackbar, setopenSnackbar] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>('')
  const [snackSeverity, setSnackSeverity] = useState<AlertColor>('info')
  const [buttonActive, setButtonActive] = useState(false)

  //------------------------------------------------------------------------------------

  // set snackbar state
  function setSnackbarState(message: string, severity: AlertColor, open: boolean) {
    setSnackMessage(message); setSnackSeverity(severity); setopenSnackbar(open);
  }


  // Event handler for Signup Confirm Button in Dialogbox
  const RegisterNewUser = async () => {

    setSignupClicked(true)
    // Register new user in database
    const AccountCreated: boolean = await registerUser(firstname, lastname, username, socialLink, password);

    if (AccountCreated) {
      setSnackbarState("Account Created ! Login Now", "success", true);
      // redirect to login after 3 sec
      setTimeout(() => {
        setSignupClicked(false)
        router.push('/login')
      }, 2500)
    }

    setSignupClicked(false)
  }


  // Event handler for Signup button
  const SignupHandler = async () => {

    // Check for Null field values (SocialMedia Link field is optional)
    if (!username || !firstname || !lastname || !password || !confirmPassword) {
      setSnackbarState("Please fill all values !", "warning", true)
      return;
    }

    if (username.length < 5) {
      setSnackbarState("Username should be greater than 5 characters !", "warning", true)
      return;
    }

    if (password.length < 8) {
      setSnackbarState("Password is too short !", "warning", true)
      return;
    }


    // Check if both password fields match
    if (password !== confirmPassword) {
      setSnackbarState("Passwords Don't Match !", "error", true)
      return;
    }

    // check if username is taken or not
    const usernameTaken = await userExists(username)
    if (usernameTaken === true) {
      setSnackbarState("Provided Username is Already Registered !", "warning", true)
      return;
    }

    // Show confirmation dialogbox
    setButtonActive(true)

  }

  //-------------------------------------------------------------------------------------------------------

  return (
    <>
      <Navbar />

      <div className="bg-gray-900 min-h-screen">

        <h1 className={IntroStyles}> Create Account </h1>

        <div className=" flex flex-col gap-y-4  mx-44 md:mx-28 lg:mx-36 xl:mx-96
          md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-5">
          <InputFields showPassword={showPassword} setFirstname={setFirstname} setLastname={setLastname} setUsername={setUsername}
            setsocialLink={setsocialLink} setshowPassword={setshowPassword} setPasswordInput={setPasswordInput} setCPasswordInput={setCPasswordInput} />
        </div>


        <div className="flex flex-col items-center">
          <button onClick={SignupHandler}
            className="h-14 max-h-14 w-44 bg-sky-500 text-white font-bold px-14 py-4 mt-10 rounded-md hover:bg-sky-600 active:bg-sky-700 ">
            {signupClicked ? <ClipLoader color="#ffffff" loading={true} size={30} /> : "SIGNUP"}
          </button>
          <div>
            <p className="text-slate-500 text-center text-base mt-10"> Already have registered account ? </p>
            <Link href="/login">
              <p className="text-white text-center text-lg font-semibold hover:font-bold"> Login here </p>
            </Link>
          </div>
        </div>

      </div>


      {buttonActive &&
        <SignupDialogbox username={username} RegisterNewUser={RegisterNewUser}
          setButtonActive={setButtonActive} />
      }

      <SnackBar openSnackbar={openSnackbar} setopenSnackbar={setopenSnackbar}
        snackMessage={snackMessage} severity={snackSeverity} autoHideDuration={3000} position={{ vertical: "top", horizontal: "right" }} />
    </>
  )
}

