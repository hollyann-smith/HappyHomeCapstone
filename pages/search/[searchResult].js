import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import ChoreCard from '../../components/ChoreCard';
import { getChores } from '../../api/choreData';

export default function SearchPage() {
  const [searchChores, setSearchChores] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { searchResult } = router.query;

  const searchAllChores = useCallback(() => {
    getChores(user.uid).then((chores) => {
      const filteredChores = chores.filter((chore) => chore.name.toLowerCase().includes(searchResult));
      setSearchChores(filteredChores);
    });
  }, [searchResult, user.uid]);

  useEffect(() => {
    searchAllChores();
    return () => {
      setSearchChores([]);
    };
  }, [searchAllChores, searchResult]);

  return (
    <>
      <Link href="/chore" passHref>
        <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-800 text-gray-800 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none mb-5" type="button">Back</button>
      </Link>
      <div className="d-flex flex-wrap">
        {searchChores.map((chore) => <ChoreCard key={chore.firebaseKey} choreObj={chore} onUpdate={searchAllChores} />)}
      </div>
    </>

  );
}
