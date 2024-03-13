import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import cleaning from '../public/photos/cleaning.jpeg';
import teamicon from '../public/photos/teamicon.jpeg';

export default function Home() {
  return (
    <div className="flex place-content-around">
      <div className="relative bg-white border shadow-sm rounded-full w-96 h-96 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] max-w-md">
        <Link href="/member" className="text-lg font-bold text-gray-800">
          <Image
            className="rounded-full w-96 h-96"
            src={teamicon}
            width={500}
            height={500}
            alt="Description"
          />
        </Link>
        <div className="absolute top-0 start-0 end-0">
          <div className="p-4 md:p-5 text-center">
            View My Team!
          </div>
        </div>
      </div>
      <div className="relative bg-white border shadow-sm rounded-full w-96 h-96 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] max-w-md">
        <Link href="/chore" className="text-lg font-bold text-gray-800">
          <Image
            className="rounded-full w-96 h-96"
            src={cleaning}
            width={500}
            height={500}
            alt="Description"
          />
        </Link>
        <div className="absolute top-0 start-0 end-0">
          <div className="p-4 md:p-5 text-center">
            View My Chores!
          </div>
        </div>
      </div>
    </div>
  );
}
