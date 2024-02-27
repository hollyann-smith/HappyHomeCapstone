import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getChores } from '../api/choreData';
import ChoreCard from '../components/ChoreCard';

function Chore() {
  const [chores, setChores] = useState([]);

  const { user } = useAuth();

  console.warn('chores home', chores);
  // console.warn(getchores(user.uid), 'getchores');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAllThechores = () => {
    getChores(user.uid).then(setChores);
  };

  useEffect(() => {
    getAllThechores();
  }, [getAllThechores]);

  return (
    <div className="text-center my-4">
      <Link href="/chore/new" passHref>
        <Button id="button">Add New chore </Button>
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
