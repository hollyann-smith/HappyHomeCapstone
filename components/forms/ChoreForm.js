import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { FloatingLabel } from 'react-bootstrap';
import { createChore, updateChore } from '../../api/choreData';
import { useAuth } from '../../utils/context/authContext';
import { getMembers } from '../../api/memberData';

const initialState = {
  name: '',
  image: '',
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
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'UPDATE' : 'ADD'} </h2>
      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Chore Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Chore"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* DESCRIPTION INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="chore Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* member SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="member">
        <Form.Select
          aria-label="member"
          name="member_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.member_id}
          required
        >
          <option value="">Select an member</option>
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
        </Form.Select>
      </FloatingLabel>
      {/* complete  */}
      <Form.Check
        className="text-white mb-3"
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
      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'UPDATE' : 'ADD'} </Button>
    </Form>
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
