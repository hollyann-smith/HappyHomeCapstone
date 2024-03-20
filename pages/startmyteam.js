import React, { useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { createMember, updateMember } from '../api/memberData';

const initialState = {
  name: '',
};

export default function StartMyTeamForm() {
  const [formInput, setFormInput] = useState([]);
  const [memberName, setMemberName] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setMemberName({
      ...memberName,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = [memberName, user.uid];

    Promise.all(payload).then(() => {
      Object.values(memberName).map((singleMember) => createMember({

        name: singleMember,

        image: 'https://static.vecteezy.com/system/resources/previews/021/407/309/original/person-with-sparkle-line-icon-vector.jpg',

        uid: user.uid,

      }).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/member');
        });
      }));
    });
  };

  const renderInputs = () => {
    const { memberCount } = formInput;
    const inputFields = [];

    for (let i = 1; i <= memberCount; i++) {
      inputFields.push(
        <FloatingLabel key={i} controlId="floatingInput1" label={`Member ${i}`}>
          <Form.Control
            type="text"
            name={`member${i}`}
            onChange={handleNameChange}
            className="mb-3"
            value={memberName.name}
            required
          />
        </FloatingLabel>,
      );
    }

    return inputFields;
  };

  return (
    <div className="bg-white relative items-center  px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-lg rounded-3xl">
      <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
        <div className="space-y-4">
          <h1 className="font-bold text-gray-600 text-center text-3xl mb-5">How many members on your team?</h1>
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingSelect" label="">
              <Form.Select
                aria-label="member"
                name="memberCount"
                onChange={handleChange}
                className="mb-3"
                value={formInput.memberCount}
                required
              >
                {[...Array(11).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            {formInput.memberCount > 0 ? <h2>Add your name as member 1!</h2> : null}
            {formInput.memberCount > 0 && renderInputs()}
            <button type="submit" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black">Lets Go!</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

StartMyTeamForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

StartMyTeamForm.defaultProps = {
  obj: initialState,
};
