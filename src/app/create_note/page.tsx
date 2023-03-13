

import CreateNoteMain from './CreateNoteMain';
const jwt = require('jsonwebtoken');
import { createPost } from '@/db_utils';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Page() {

  // Access cookies in Request Header
  const cookieStore = cookies();
  const token = cookieStore.get('JWTAuthToken');
  const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;

  // If JWT Cookie does'nt exist redirect to login page
  if (!token) {
    redirect('/login')
  }

  const result = jwt.verify(token.value, SECRET_KEY);
  const loggedUser = result.loggedUser;
  console.log("Already LoggedIn As : ", loggedUser)

  // Create a new post in firestore for loggedIn user
  const currentDate = String(format(new Date(), 'MMM dd, h:mm aa, yyyy'))
  const postid = await createPost(loggedUser, { title: '', body: '', createdOn: currentDate, lastUpdated: currentDate })
  if (postid === null) {
    return <> <h1> Failed to Create New Post ! Try Again </h1></>
  }

  return (
    <>
      <CreateNoteMain PostId={postid} />
    </>
  )

}
