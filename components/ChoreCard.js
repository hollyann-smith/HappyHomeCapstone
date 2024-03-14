import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { deleteSingleChore } from '../api/choreData';
import { getSingleMember } from '../api/memberData';

export default function ChoreCard({ choreObj, onUpdate }) {
  const [memberObj, setMemberObj] = useState({});
  const [isShowing, setIsShowing] = useState(false);

  const getMemberNames = () => {
    getSingleMember(choreObj.member_id).then(setMemberObj);
  };

  useEffect(() => {
    getMemberNames();
  }, []);

  const deleteThischore = () => {
    if (window.confirm(`Remove ${choreObj.name}?`)) {
      deleteSingleChore(choreObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <button onClick={() => setIsShowing(!isShowing)} id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5" type="button">
          <span className="sr-only">Open dropdown</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        <Transition
          show={isShowing}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <Link href={`/chore/edit/${choreObj.firebaseKey}`} passHref>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" type="button">Edit</button>
                </Link>
              </li>
              <li>
                <button className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" type="button" onClick={deleteThischore}>Delete</button>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={choreObj?.image} alt={choreObj?.name} />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{choreObj.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{memberObj?.name ? `Assigned to: ${memberObj?.name}` : 'Unassigned'}</span>
        <p>{choreObj?.description}</p>
        <div className="flex mt-4 md:mt-6"><p>{choreObj.isComplete && <span>COMPLETED!<br /></span>}</p>
        </div>
      </div>
    </div>
  );
}

ChoreCard.propTypes = {
  choreObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    isComplete: PropTypes.bool,
    member_id: PropTypes.string,
    memberData: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};
