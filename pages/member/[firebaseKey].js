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
      <div className="mt-5 d-flex flex-wrap justify-center mb-6">
        <div className="d-flex flex-column">
          <img src={memberDetails.image} alt={memberDetails.first_name} className="shadow-lg rounded-full mx-auto max-w-120-px max-w-40" />
        </div>
        <div className="text-black ms-5 details text-5xl">
          <h1>
            {memberDetails.name}
          </h1>
          <Link href={`/member/edit/${memberDetails.firebaseKey}`} passHref>
            <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-gray-800 text-gray-800 hover:border-gray-500 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none mb-5 justify-self-center" type="button">EDIT</button>
          </Link>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-center">
        <ChoreTable choreArray={memberDetails.chores} />
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
