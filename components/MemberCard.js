/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function MemberCard({ memberObj }) {
  return (
    <div className="flex justify-content mx-2 my-2">
      <div className="px-6">
        <Link href={`/member/${memberObj?.firebaseKey}`} passHref>
          <img alt="..." src={memberObj?.image} className="shadow-lg rounded-full mx-auto max-w-120-px max-w-40 cursor-pointer" />
        </Link>
        <div className="pt-6 text-center">
          <Link href={`/member/${memberObj?.firebaseKey}`} passHref>
            <h5 className="text-xl font-bold text-blueGray-700 cursor-pointer">{memberObj?.name}</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
