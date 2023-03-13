

import ChangePasswordMain from './ChangePasswordMain';
const jwt = require('jsonwebtoken');
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function Page() {

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

  return (
    <>
      <ChangePasswordMain />
    </>
  )

}


