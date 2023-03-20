import React from 'react'
import Post from './Post';
import Image from 'next/image';

type Post = {
    id: string;
    title: string;
    body: string;
    createdOn: string;
    lastUpdated: string;
}

function NoPostsFound() {
    return (
        <div className="flex flex-col items-center justify-center mt-16">
            <p className="text-gray-400 text-xl">NO NOTES FOUND !</p>
            <Image src="/empty_box.svg" alt=" " width={370} height={370} />
        </div>
    );
}

export default async function PostsGrid({ posts }: { posts: Post[] }) {

    if (posts.length === 0) {
        return (
            <NoPostsFound />
        );
    }

    return (
        <>
            <div className='flex flex-col gap-y-7 sm:grid sm:grid-cols-3 sm:gap-x-10 pb-20
            mx-8 sm:mx-10 lg:mx-32 min-[1200px]:mx-60'>
                {posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </>
    );
}
