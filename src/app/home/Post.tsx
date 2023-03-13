
"use client"

// Defines a single Post component

import React from 'react'
import { useRouter } from 'next/navigation';
import { Raleway, Roboto } from "@next/font/google"; // Import 'Raleway' Google Font
const Title_ralewayFont = Raleway({ weight: '600', subsets: ['latin'] });
const Body_ralewayFont = Raleway({ weight: '400', subsets: ['latin'] });
const Date_robotoFont = Roboto({ weight: '400', subsets: ['latin'] });

type Post = {
    id: string;
    title: string;
    body: string;
    createdOn: string;
    lastUpdated: string;
}

const postWrapperStyles = "bg-slate-800 hover:bg-sky-500 p-3 rounded-md relative text-[#BCBCBC] hover:text-white active:bg-sky-600 flex flex-col justify-between";
const PostTitleStyles = `text-white text-lg font-semibold mb-2 ${Title_ralewayFont.className} line-clamp-1 `; // limits Title to take only 1 line
const PostBodyStyles = `text-sm ${Body_ralewayFont.className} line-clamp-6 `; // limits Body to take only 6 lines

export default function Post({ post }: { post: Post }) {

    const router = useRouter()

    return (
        <>
            <div className={postWrapperStyles} onClick={(e) => router.push(`/edit_note/${post.id}`)}>
                <div className="flex-1">
                    <p className={PostTitleStyles}>{post.title}</p>
                    <p className={PostBodyStyles}>{post.body}</p>
                </div>
                <p className={`text-xs pt-3  font-semibold ${Date_robotoFont.className}`}> {post.lastUpdated}  </p>
            </div>
        </>
    )
}
