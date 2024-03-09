import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MemberForm from '../../../components/forms/MemberForm';
import { deleteSingleMember, getSingleMember } from '../../../api/memberData';

export default function EditMember(onUpdate) {
  const [editMember, setMemberEdit] = useState();
  const router = useRouter();

  const { firebaseKey } = router.query;
  const deleteThismember = () => {
    if (window.confirm(`Remove ${editMember.name}?`)) {
      deleteSingleMember(editMember.firebaseKey).then(() => onUpdate());
    }
  };
  useEffect(() => {
    getSingleMember(firebaseKey).then(setMemberEdit);
  }, [firebaseKey]);

  return (
    <>
      <MemberForm obj={editMember} />
      <button type="button" className="btn-danger" onClick={deleteThismember} style={{ height: '20px' }}>
        DELETE
      </button>
    </>
  );
}
