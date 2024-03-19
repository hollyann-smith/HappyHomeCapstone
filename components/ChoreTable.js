import PropTypes from 'prop-types';
import ViewChore from '../pages/chore/[firebaseKey]';

export default function ChoreTable({ choreArray }) {
  const allChores = choreArray;
  return (
    <div className="flex flex-col ">
      {/* {
      isOpen && <ViewChore isOpen={isOpen} chore={chore} />
    } */}
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg overflow-hidden dark:border-gray-700">
            <table className="min-w-full divide-y  bg-white divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-start text-s text-gray-900 uppercase font-bold">Name</th>
                  <th scope="col" className="px-6 py-3 text-start text-s font-bold text-gray-600 uppercase">Description</th>
                  <th scope="col" className="px-6 py-3 text-start text-s font-bold text-gray-600 uppercase">Complete?</th>
                  <th scope="col" className="px-6 py-3 text-end text-s font-bold text-gray-500 uppercase">View</th>
                </tr>
              </thead>
              {allChores?.map((choreObj) => (
                <tbody key={choreObj.firebaseKey} className="divide-y divide-gray-200 ">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 capitalize">{choreObj?.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{choreObj.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{choreObj?.isComplete === true ? 'DONE!' : ''}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <Link href={`/chore/${choreObj.firebaseKey}`} passHref>
                        <button type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1">Details</button>
                      </Link>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                      <ViewChore choreDetails={choreObj} />
                      {/* <button
                        type="button"
                        onClick={() => {
                          openModal();
                          setChore(choreObj);
                        }}
                        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                      >
                        Open dialog
                      </button> */}

                    </td>
                  </tr>
                </tbody>
              ),
              allChores.sort((a, b) => a.isComplete - b.isComplete))}

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

ChoreTable.propTypes = {
  choreArray: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    isComplete: PropTypes.bool,
    member_id: PropTypes.string,
    memberData: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,

};
