/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { viewMemberDetails } from '../../api/mergedData';
import ChoreTable from '../../components/ChoreTable';

export default function Viewmember() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewMemberDetails(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={memberDetails.image} alt={memberDetails.first_name} className="shadow-lg rounded-full mx-auto max-w-120-px max-w-60" />
        </div>
        <div className="text-black ms-5 details text-5xl">
          <h1>
            {memberDetails.name}
          </h1>
          <Link href={`/member/edit/${memberDetails.firebaseKey}`} passHref>
            <button className="btn-primary" type="button">EDIT</button>
          </Link>
        </div>
      </div>
      <hr />
      <div className="d-flex flex-wrap">
        <>
          <ChoreTable choreArray={memberDetails.chores} />
        </>
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
