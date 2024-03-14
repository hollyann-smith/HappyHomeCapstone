import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import cleaning from '../public/photos/cleaning.jpeg';
import teamicon from '../public/photos/teamicon.jpeg';

export default function Home() {
  return (
    <div className="flex content-center mx-3 my-3">
      <div className="relative bg-white border shadow-sm rounded-3xl w-76 h-96 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] max-w-md mx-3 my-3">
        <Link href="/member" className="text-lg font-bold text-gray-800" passHref>
          <Image
            className="rounded-full w-76 h-96"
            src={teamicon}
            width={500}
            height={500}
            alt="Description"
          />
        </Link>
        <div className="absolute top-0 start-0 end-0">
          <div className="p-4 md:p-5 text-center text-3xl font-extrabold">
            View My Team!
          </div>
        </div>
      </div>
      <div className="relative bg-white border shadow-sm rounded-3xl w-76 h-96 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] max-w-md mx-3 my-3">
        <Link href="/chore" className="text-lg font-bold text-gray-800" passHref>
          <Image
            className="rounded-full w-76 h-96"
            src={cleaning}
            width={500}
            height={500}
            alt="Description"
          />
        </Link>
        <div className="absolute top-0 start-0 end-0">
          <div className="p-4 md:p-5 text-center text-3xl font-extrabold">
            View My Chores!
          </div>
        </div>
      </div>
    </div>
  );
}
