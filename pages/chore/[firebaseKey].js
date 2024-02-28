/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewChoreDetails } from '../../api/mergedData';

export default function ViewChore() {
  const [choreDetails, setChoreDetails] = useState({});
  const router = useRouter();
  console.warn(choreDetails, 'choreDetails');
  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;
  console.warn(choreDetails, 'choreDetails');
  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewChoreDetails(firebaseKey).then(setChoreDetails);
  }, [firebaseKey]);

  return (
    <div id="view">
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={choreDetails.image} alt={choreDetails.title} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <h5>
            {choreDetails.title}
            {choreDetails.memberObj?.name || 'Unassigned'}
          </h5>
          <p>{choreDetails.description || ''}</p>
          <hr />
          <p>
            {choreDetails.isComplete && <span>COMPLETED!<br /></span>}
          </p>
        </div>
      </div>
    </div>
  );
}
