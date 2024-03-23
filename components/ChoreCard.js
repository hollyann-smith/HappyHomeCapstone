/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { deleteSingleChore } from '../api/choreData';
import { getSingleMember } from '../api/memberData';

export default function ChoreCard({ choreObj, onUpdate }) {
  const [memberObj, setMemberObj] = useState({});

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

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <div className={classNames(choreObj.isComplete ? 'bg-stone-300 italic' : 'bg-white', 'w-full max-w-xs  border border-gray-200 rounded-full shadow  p-6 mx-2 my-2 place-content-center')}>
      <div className="flex justify-end ">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-26 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href={`/chore/edit/${choreObj.firebaseKey}`} passHref>
                      <button
                        type="submit"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block w-full px-4 py-2 text-start text-sm',
                        )}
                      >
                        Edit
                      </button>
                    </Link>
                  )}
                </Menu.Item>
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={deleteThischore}
                        type="button"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block w-full px-4 py-2 text-left text-sm',
                        )}
                      >
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-32 h-32 w- mb-3 rounded-full shadow-lg"
          src={choreObj?.image}
          alt={choreObj?.name}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 capitalize">{choreObj.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{memberObj?.name ? `Assigned to: ${memberObj?.name}` : 'Unassigned'}</span>
        <div className="p-8 first-letter:capitalize">{choreObj?.description}</div>
        <p>{choreObj.isComplete && <span>COMPLETED!<br /></span>}</p>
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
