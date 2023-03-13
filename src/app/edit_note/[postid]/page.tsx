
import React from 'react'
const jwt = require('jsonwebtoken');
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getPostbyId } from '../../../db_utils';
import CreateNoteMain from '@/app/create_note/CreateNoteMain';

type Params = {
    params: { postid: string }
}

export default async function Page({ params }: Params) {

    // Access the PostID in URL
    const postid = params.postid;

    // Access cookies in Request Header
    const cookieStore = cookies();
    const token = cookieStore.get('JWTAuthToken');
    console.log("TOKEN : ", token)

    // If Token cookie does'nt exist redirect
    if (!token || !token.value) {
        redirect("/login")
    }

    // Extract user data from JWT token
    const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
    const result = jwt.verify(token.value, SECRET_KEY);
    const LoggedInUser = result.loggedUser;

    // Get the post with given Id
    const postDoc = await getPostbyId(LoggedInUser, postid)

    // Check if the post with given Id exists
    if (!postDoc.exists()) {
        console.log("Given Post with PostID does'nt exist !")
        redirect("/home")
    }

    const post = postDoc.data();
    console.log("Fetched Post : ", post)

    return (
        <>
            <div className="bg-gray-900 min-h-screen">
                <CreateNoteMain PostId={postid} forEdit={true} postData={post} />
            </div>
        </>
    )
}