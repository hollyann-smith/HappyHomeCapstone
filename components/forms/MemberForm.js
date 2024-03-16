import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createMember, deleteSingleMember, updateMember } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  image: 'https://static.vecteezy.com/system/resources/previews/021/407/309/original/person-with-sparkle-line-icon-vector.jpg',
  isAdmin: false,
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  const deleteThismember = () => {
    if (window.confirm(`Remove ${obj?.name}?`)) {
      deleteSingleMember(obj?.firebaseKey).then(() => {
        router.push('/member');
      });
    }
  };

  useEffect(() => {
    if (obj?.firebaseKey) setFormInput(obj);
  }, [obj]);

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
      updateMember(formInput)
        .then(() => router.push('/member'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/member');
        });
      });
    }
  };

  return (
    <div className="bg-white relative items-center  px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-lg rounded-3xl">
      <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
        <div className="space-y-4" onSubmit={handleSubmit}>
          <h2 className="font-bold text-gray-600 text-center text-3xl mb-5">{obj.firebaseKey ? 'Edit' : 'Add'} Member</h2>
          {/* FIRST NAME INPUT  */}
          <div className="mt-4">
            <label htmlFor="text" className="block text-sm font-medium text-gray-600">First Name: </label>
            <input
              type="text"
              className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter Chore"
              name="name"
              value={formInput.name}
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
          {/* SUBMIT BUTTON  */}
          <button type="submit" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black" onClick={handleSubmit}>{obj?.firebaseKey ? 'UPDATE' : 'ADD'} </button>
          <div className="flex justify-end">
            {obj?.firebaseKey ? <button type="button" className="btn-danger" onClick={deleteThismember} style={{ height: '20px' }}>DELETE</button> : null}
          </div>
        </div>
      </div>
      <div />
    </div>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    isAdmin: PropTypes.bool,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
export default MemberForm;
