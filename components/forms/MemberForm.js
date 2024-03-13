import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { FloatingLabel } from 'react-bootstrap';
import { createMember, deleteSingleMember, updateMember } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  image: 'https://www.drawing123.com/wp-content/uploads/2022/08/ket-qua-16.jpg',
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
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj?.firebaseKey ? 'UPDATE' : 'ADD'} </h2>
      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Member Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj?.firebaseKey ? 'UPDATE' : 'ADD'} </Button>
      {obj?.firebaseKey ? <button type="button" className="btn-danger" onClick={deleteThismember} style={{ height: '20px' }}>DELETE</button> : null}
    </Form>
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
