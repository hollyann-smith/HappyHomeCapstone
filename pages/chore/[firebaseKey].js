/* eslint-disable @next/next/no-img-element */

// import { Dialog } from '@headlessui/react';

// const ViewChore = (isOpen, close, choreDetails) => {
//   console.log(isOpen);
//   console.log(close);
//   console.log(choreDetails);
//   return (
//     <Dialog
//       open={isOpen}
//       onClose={() => null}
//       className="relative z-50"
//     >
//       <div className="w-full max-w-screen-md bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700 p-6 mx-2 my-2 place-content-center items-center">
//         <Dialog.Panel className="mt-5 d-flex flex-wrap">
//           <div className="d-flex flex-column rounded-3xl">
//             <img
//               src={choreDetails?.image}
//               alt={choreDetails?.title}
//               style={{ width: '300px' }}
//               className="rounded-full"
//             />
//           </div>
//           <div className="text-gray-900 ms-5 details flex flex-col items-center space-y-4">
//             <h5 className="mb-1 text-xl font-medium text-gray-900 capitalize">
//               {choreDetails?.name}
//             </h5>
//             <h3 className="text-sm text-gray-500 dark:text-gray-400">          Assigned to: {choreDetails?.memberObj?.name || 'Unassigned'}</h3>
//             <p>Description:</p>
//             <p>{choreDetails?.description || ''}</p>
//             <hr />
//             <p>
//               {choreDetails?.isComplete && <span>COMPLETED!<br /></span>}
//             </p>
//           </div>
//         </Dialog.Panel>
//       </div>
//     </Dialog>
//   );
// };

// export default ViewChore;

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

const ViewChore = (choreDetails) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(choreDetails);
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
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

export default ViewChore;
