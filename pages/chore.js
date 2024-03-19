import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getChores } from '../api/choreData';
import ChoreCard from '../components/ChoreCard';
import SearchBar from '../components/SearchBar';

function Chore() {
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
    <div className="text-center my-4">
      <div className="flex flex-row place-content-between">
        <SearchBar />
        <Link href="/choretable" passHref>
          <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-800 text-gray-800 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none mb-5" type="button">Table View </button>
        </Link>
      </div>
      <Link href="/chore/new" passHref>
        <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-800 text-gray-800 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none mb-5" type="button">Add New chore </button>
      </Link>
      <div className="flex flex-wrap grid-cols-2 gap-4 place-content-center content-center justify-center">

        {chores.map((chore) => (
          <ChoreCard key={chore.firebaseKey} choreObj={chore} onUpdate={getAllThechores} />
        ),
        chores.sort((a, b) => a.isComplete - b.isComplete))}
      </div>

    </div>
  );
}

export default Chore;
