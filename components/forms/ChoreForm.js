import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { createChore, updateChore } from '../../api/choreData';
import { useAuth } from '../../utils/context/authContext';
import { getMembers } from '../../api/memberData';

const initialState = {
  name: '',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlfNhZVbu08UtTLwIPKIn3LRlZ2Geiaxo5hCoYeXwbrtYT7gh6bASBzvsvQeP-3P4QSqY&usqp=CAU',
  description: '',
  isComplete: false,
};

function ChoreForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [members, setMembers] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getMembers(user.uid).then(setMembers);

    if (obj.firebaseKey) {
      setFormInput(obj);
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateChore(formInput)
        .then(() => router.push('/chore'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createChore(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateChore(patchPayload).then(() => {
          router.push('/chore');
        });
      });
    }
  };

  return (
    <div className="bg-white relative items-center  px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-lg rounded-3xl">
      <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
        <div className="space-y-4" onSubmit={handleSubmit}>
          <h2 className="font-bold text-gray-600 text-center text-3xl mb-5">{obj.firebaseKey ? 'Edit' : 'Add'} Chore</h2>
          {/* FIRST NAME INPUT  */}
          {/* <div className="block mb-3 text-sm font-medium text-gray-600"> What is the chore?   </div> */}
          <div className="mt-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-600">What is the chore?</label>
            <input
              type="text"
              className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm capitalize"
              placeholder="Enter Chore"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* DESCRIPTION INPUT  */}
          <div className="mt-4">
            <label htmlFor="image" className="block mb-0 text-sm font-medium text-gray-600">Add a description...</label>
            <input
              type="text"
              className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Description"
              name="description"
              value={formInput.description}
              onChange={handleChange}
              required
            />
          </div>
          {/* IMAGE INPUT  */}
          <div className="mt-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-600">Add an image:</label>
            <input
              id="image"
              type="url"
              className="block w-full px-6 py-3 mt-1 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter an image url"
              name="image"
              value={formInput.image}
              onChange={handleChange}
              required
            />
          </div>
          {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload file</label>
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">A profile picture is useful to confirm your are logged into your account</div> */}

          {/* member SELECT  */}
          <div className="mt-4">
            <label htmlFor="member" className="block text-sm font-medium text-gray-600">Assign to:</label>
            <select
              aria-label="member"
              name="member_id"
              onChange={handleChange}
              className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm "
              value={formInput.member_id}
              required
            >
              <option value="">Select an member</option>
              <option>Unassigned</option>
              {
            members.map((member) => (
              <option
                key={member.firebaseKey}
                value={member.firebaseKey}
              >
                {member.name}
              </option>
            ))
          }
            </select>
          </div>
          {/* complete  */}
          <div className="flex justify-end">
            {obj.firebaseKey ? (
              <Form.Check
                className="text-gray-600 mb-3"
                type="switch"
                id="isComplete"
                name="isComplete"
                label="complete?"
                checked={formInput.isComplete}
                value={formInput.isComplete}
                onChange={(e) => {
                  setFormInput((prevState) => ({
                    ...prevState,
                    isComplete: e.target.checked,
                  }));
                }}
              />
            ) : null}
          </div>
          {/* SUBMIT BUTTON  */}
          <button type="submit" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black" onClick={handleSubmit}>{obj.firebaseKey ? 'UPDATE' : 'ADD'} </button>
        </div>
      </div>
    </div>
  );
}

ChoreForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    isComplete: PropTypes.bool,
    description: PropTypes.string,
  }),
};

ChoreForm.defaultProps = {
  obj: initialState,
};
export default ChoreForm;
