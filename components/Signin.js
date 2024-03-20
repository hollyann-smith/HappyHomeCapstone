import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from '../utils/auth';
import w from '../public/photos/1707-washing-dishes.gif';
// import handwash from '../public/photos/handwash.jpeg';

function SigninPage() {
  return (
    <div className="flex flex-wrap justify-center justify-items-center -mt-20 mx-52 max-w-xl">
      <div className="relative bg-white border shadow-xl rounded-3xl w-full h-full dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] max-2xl: mx-3 my-3">
        <div className="text-7xl font-bold justify-content-center text-center mb-4">Welcome to Happy Home!</div>
        <Image
          className="rounded-3xl items-center justify center"
          priority
          src={w}
          width={500}
          height={500}
          alt="Description"
        />
        <div className="flex justify-center mb-10">
          <Link href="/" passHref>
            <button type="button" size="lg" className="flex justify-items-center justify-center align-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-xl focus-visible:ring-black mb-2 max-w-60" onClick={signIn}>
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
