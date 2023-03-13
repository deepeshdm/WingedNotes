import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Raleway } from "@next/font/google";
// Import 'Raleway' Google Font
const ralewayFont = Raleway({ weight: '700', subsets: ['latin'] });

export default function Navbar() {

    const headStyles = `text-white text-2xl ${ralewayFont.className}`;

    return (
        <>
            <div className="bg-gray-900">

                <div className="flex justify-between items-center h-16 px-6">
                    <Link href="/home">
                        <div className="flex items-center pt-4">
                            <Image src="/memo_emoji.png" alt="" width={40} height={40} className="mr-1" />
                            <h1 className={headStyles}>Winged<span className="text-sky-500">NOTES</span></h1>
                        </div>
                    </Link>
                    <nav className="flex space-x-4">
                        <Link href="/login" className="text-gray-300 hover:text-white">
                            Login
                        </Link>
                        <Link href="/signup" className="text-gray-300 hover:text-white">
                            Signup
                        </Link>
                    </nav>
                </div>

            </div>
        </>
    )
}
