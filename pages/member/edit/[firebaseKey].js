import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MemberForm from '../../../components/forms/MemberForm';
import { getSingleMember } from '../../../api/memberData';

export default function EditMember() {
  const [editMember, setMemberEdit] = useState();
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setMemberEdit);
  }, [firebaseKey]);

  return (<MemberForm obj={editMember} />);
}
