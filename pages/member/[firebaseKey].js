/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { viewMemberDetails } from '../../api/mergedData';
import ChoreCard from '../../components/ChoreCard';

export default function Viewmember() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const showMemberDetails = () => {
    viewMemberDetails(firebaseKey).then(setMemberDetails);
  };

  useEffect(() => {
    viewMemberDetails(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={memberDetails.image} alt={memberDetails.first_name} style={{ height: '200px' }} />
        </div>
        <div className="text-black ms-5 details">
          <h1>
            {memberDetails.name}
          </h1>
          <Link href={`/member/edit/${memberDetails.firebaseKey}`} passHref>
            <button className="btn-primary" type="button">EDIT</button>
          </Link>
          <hr />
        </div>
      </div>
      <hr />
      <div className="d-flex flex-wrap">
        {memberDetails.chores?.map((chore) => (
          <ChoreCard key={chore.firebaseKey} choreObj={chore} onUpdate={showMemberDetails} />
        ))}
      </div>
    </>
  );
}
Viewmember.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};
Viewmember.defaultProps = {
  obj: {},
};
