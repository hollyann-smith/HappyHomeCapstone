import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getChores } from '../api/choreData';
import ChoreCard from '../components/ChoreCard';

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
      <Link href="/chore/new" passHref>
        <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-800 text-gray-800 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none mb-5" type="button">Add New chore </button>
      </Link>
      <div className="d-flex flex-wrap">
        {chores.map((chore) => (
          <ChoreCard key={chore.firebaseKey} choreObj={chore} onUpdate={getAllThechores} />
        ))}
      </div>

    </div>
  );
}

export default Chore;
