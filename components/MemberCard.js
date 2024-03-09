import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function MemberCard({ memberObj }) {
  return (
    <div className="flex justify-content-around">
      <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-8">
        <div className="px-6">
          <Link href={`/member/${memberObj?.firebaseKey}`} passHref>
            <img alt="..." src={memberObj?.image} className="shadow-lg rounded-full mx-auto max-w-120-px" />
          </Link>
          <div className="pt-6 text-center">
            <h5 className="text-xl font-bold text-blueGray-700">{memberObj?.name}</h5>
          </div>
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
