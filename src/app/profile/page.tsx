
// Dyamically render page on each request
export const revalidate = 0

import React from 'react'
const jwt = require('jsonwebtoken');
import { getUserDocument } from '@/db_utils';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import ProfileMain from './ProfileMain';
import HomeNavbar from "../components/HomeNavbar";


export default async function Profile() {

  // Access cookies in Request Header
  const cookieStore = cookies();
  const token = cookieStore.get('JWTAuthToken');
  console.log("TOKEN : ", token)

  // If Token cookie does'nt exist redirect
  if (!token || !token.value) {
    redirect("/login")
  }

  // Extract data from JWT token
  const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
  const result = jwt.verify(token.value, SECRET_KEY);
  const LoggedInUser = result.loggedUser;

  // Access the user document
  const userData = await getUserDocument(LoggedInUser)
  console.log("USERDATA : ", userData?.data())
  const userDoc = userData?.data()

  return (
    <>
      <HomeNavbar LoggedInUser={LoggedInUser} />
      <ProfileMain LoggedInUser={LoggedInUser} userDoc={userDoc} />
    </>
  )
}
