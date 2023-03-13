
import React from 'react'
const jwt = require('jsonwebtoken');
import ActionOptions from './ActionOptions';
import HomeNavbar from "../components/HomeNavbar";
import PostsGrid from './PostsGrid';
import { redirect } from 'next/navigation';
import { getUserPosts } from '@/db_utils';
import { cookies } from 'next/headers';


type Post = {
  id: string;
  title: string;
  body: string;
  createdOn: string;
  lastUpdated: string;
}

// remove empty posts (show only posts whose body or title is not empty)
function filterPosts(posts: Post[]): Post[] {
  return posts.filter(post => post.title.trim() !== "" || post.body.trim() !== "");
}


// Get all posts for given user from firestore database
async function getPosts(LoggedInUser: string): Promise<Post[]> {

  let allPosts = await getUserPosts(LoggedInUser);

  if (allPosts === null) {
    return []
  }

  // remove all posts which contain empty body & titles
  allPosts = filterPosts(allPosts)

  return allPosts.map((post: any) => {
    return {
      id: post.id,    // Unique ID of post
      title: post.title,
      body: post.body,
      createdOn: post.createdOn,
      lastUpdated: post.lastUpdated
    };
  });
}


export default async function Home() {

  // Access cookies in Request Header
  const cookieStore = cookies();
  const token = cookieStore.get('JWTAuthToken');

  // If Token cookie does'nt exist redirect
  if (!token || !token.value) {
    redirect("/login")
  }

  // Extract data from JWT token
  const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;
  const result = jwt.verify(token.value, SECRET_KEY);
  const LoggedInUser = result.loggedUser;

  // Get all posts of given user
  let posts = await getPosts(LoggedInUser)
  if (posts === null || posts === undefined) { posts = [] }
  console.log("MY ALL POSTS : ", posts)

  return (
    <>
      <div className="bg-gray-900 min-h-screen">
        <HomeNavbar LoggedInUser={LoggedInUser} />
        <ActionOptions TotalNotes={String(posts.length)} LoggedInUser={LoggedInUser} />
        {/* @ts-expect-error Server Component */}
        <PostsGrid posts={posts} />
      </div>
    </>
  );
}
