import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import ChoreTable from '../components/ChoreTable';
import { getChores } from '../api/choreData';

export default function NewMember() {
  const [chores, setChores] = useState([]);

  const { user } = useAuth();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllThechores = () => {
    getChores(user.uid).then(setChores);
  };

  useEffect(() => {
    getAllThechores();
  }, []);

  return (
    <>
      <Link href="/chore" passHref>
        <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-800 text-gray-800 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none mb-5" type="button">Back to Card View </button>
      </Link>
      <ChoreTable choreArray={chores} />
    </>
  );
}
