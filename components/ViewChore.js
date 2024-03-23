/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getSingleMember } from '../api/memberData';

const ViewChore = ({ choreDetails }) => {
  const [memberObj, setMemberObj] = useState({});

  const getMemberNames = () => {
    getSingleMember(choreDetails.member_id).then(setMemberObj);
  };

  useEffect(() => {
    getMemberNames();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-black-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1"
        >
          Details
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >

                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex items-center gap-x-2 p-2 text-sm font-semibold rounded-lg border border-transparent text-black-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="d-flex justify-center rounded-3xl">
                      <img
                        src={choreDetails?.image}
                        alt={choreDetails?.title}
                        style={{ width: '300px' }}
                        className="rounded-full"
                      />
                    </div>
                  </Dialog.Title>
                  <div className="mt-2" />
                  <div className="text-gray-900 ms-5 details flex flex-col items-center space-y-4">
                    <h5 className="mb-1 text-xl font-medium text-gray-900 capitalize">
                      {choreDetails?.name}
                    </h5>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">          Assigned to: {memberObj?.name || 'Unassigned'}</h3>
                    <p className="mb-0">Description:</p>
                    <p>{choreDetails?.description || ''}</p>
                    <hr />
                    <p>
                      {choreDetails?.isComplete && <span>COMPLETED!<br /></span>}
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

ViewChore.propTypes = {
  choreDetails: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    isComplete: PropTypes.bool,
    member_id: PropTypes.string,
    memberData: PropTypes.string,
  }),
};
ViewChore.defaultProps = {
  choreDetails: {},
};

export default ViewChore;
