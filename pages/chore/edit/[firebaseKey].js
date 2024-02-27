import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ChoreForm from '../../../components/forms/ChoreForm';
import { getSingleChore } from '../../../api/choreData';

export default function EditChore() {
  const [editChore, setChoreEdit] = useState();
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleChore(firebaseKey).then(setChoreEdit);
  }, [firebaseKey]);

  return (<ChoreForm obj={editChore} />);
}
