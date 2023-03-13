

import LoginMain from "./LoginMain";
const jwt = require('jsonwebtoken');
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Navbar from "../components/NavBar";

export default function Page() {

  // Access cookies in Request Header
  const cookieStore = cookies();
  const token = cookieStore.get('JWTAuthToken');
  const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;

  // If JWT Cookie Token exist, redirect to '/home' without login
  if (token) {
    const result = jwt.verify(token.value, SECRET_KEY);
    const loggedUser = result.LoggedUser;
    console.log(result)
    console.log("Already LoggedIn As : ", loggedUser)
    redirect('/home')
  }

  return (
    <>
      <Navbar />
      <LoginMain />
    </>
  )

}


