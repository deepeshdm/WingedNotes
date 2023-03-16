import Image from "next/image";
import Link from "next/link";
const jwt = require('jsonwebtoken');
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Raleway } from "@next/font/google";
import { ButterFlyBackground } from "./components/animatedBackground.jsx"

// Import 'Raleway' Google Font
const ralewayFont = Raleway({ weight: '700', subsets: ['latin'] });


export default function Home() {

  // Access cookies in Request Header
  const cookieStore = cookies();
  const token = cookieStore.get('JWTAuthToken');
  const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET;

  // If JWT Cookie Token exist, redirect to '/home' without login
  if (token) {
    const result = jwt.verify(token.value, SECRET_KEY);
    const loggedUser = result.LoggedUser;
    console.log("Already LoggedIn As : ", loggedUser)
    redirect('/home')
  }

  return (
    <>

      <ButterFlyBackground />

      <div id="main-content" className="absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center select-none">

        <div className="flex flex-col items-center justify-center bg-gray-700 bg-opacity-70 rounded-md shadow-md
          mx-10 pt-8 pb-4 px-5 sm:px-10 sm:pt-14 ">

          <div className="flex space-x-2 items-center max-sm:flex-col max-sm:space-y-2">
            <Image src="/memo_emoji.png" alt="" width={90} height={90} className="ml-7 sm:mr-1" />
            <h1 className={`text-white font-bold text-4xl sm:text-5xl md:text-6xl head-shadow ${ralewayFont.className}`}>
              Winged<span className="text-sky-500">NOTES</span>
            </h1>
          </div>

          <p className="font-light text-white mt-3 text-center text-base sm:text-xl head-shadow">
            "Keep all your notes in one place with a cloud-based Notepad"
          </p>


          <div className="flex space-x-10 mt-14 max-sm:flex-col max-sm:space-x-0 max-sm:space-y-5">
            <Link href="/login" className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-600 active:from-pink-600 active:to-purple-700 text-white text-lg font-semibold py-3 px-8 rounded-md shadow-md transition duration-300">
              LOGIN
            </Link>
            <Link href="/signup" className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 active:from-teal-600 active:to-blue-700 text-white text-lg font-semibold py-3 px-8 rounded-md shadow-md transition duration-300">
              REGISTER
            </Link>
          </div>

          <a href="https://github.com/deepeshdm/WingedNotes" target="_blank" >
            <p className="font-medium text-white opacity-70 text-xs head-shadow mt-10 mb-5"> Github@deepeshdm  </p>
          </a>

        </div>
      </div>
    </>

  )
}
