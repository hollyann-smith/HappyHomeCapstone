import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
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
    console.warn(e, 'e');

    const payload = [memberName, user.uid];

    Promise.all(payload).then(() => {
      Object.values(memberName).map((singleMember) => createMember({

        name: singleMember,

        image: 'https://www.clker.com/cliparts/G/l/1/N/c/8/black-and-white-straight-face.svg.med.png',

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
    <><h1>How many members on your team?</h1>
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
        <h2>Add your name as member 1!</h2>
        {formInput.memberCount > 0 && renderInputs()}
        <Button type="submit">Lets Go!</Button>
      </Form>
    </>
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
