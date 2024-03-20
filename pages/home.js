import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import cleaning from '../public/photos/cleaning.jpeg';
import teamicon from '../public/photos/teamicon.jpeg';

export default function Home() {
  return (
    <div className="flex flex-wrap grid-cols-2 gap-4 place-content-center content-center justify-center mt-40">
      <div className="relative bg-whiteborder shadow-xl shadow-slate-900 rounded-3xl w-96 h-96 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] max-w-md mx-3 my-3">

        <Image
          className="rounded-3xl"
          priority
          src={teamicon}
          width={500}
          height={500}
          alt="Description"
        />

        <div className="absolute top-0 start-0 end-0">
          <Link href="/member" className="text-lg font-bold text-gray-800" passHref>
            <div className="p-4 md:p-5 text-center text-3xl font-extrabold cursor-pointer">
              View My Team!
            </div>
          </Link>
        </div>
      </div>
      <div className="relative bg-white border shadow-xl shadow-slate-900 rounded-3xl w-96 h-96 dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] max-w-md mx-3 my-3">
        <Image
          className="rounded-3xl"
          priority
          src={cleaning}
          width={500}
          height={500}
          alt="Description"
        />
        <div className="absolute top-0 start-0 end-0">
          <Link href="/chore" className="text-lg font-bold text-gray-800" passHref>
            <div className="p-4 md:p-5 text-center text-3xl font-extrabold cursor-pointer">
              View My Chores!
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
