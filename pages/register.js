import React from 'react';
import RegisterForm from '../components/RegisterForm';
// import { useAuth } from '../utils/context/authContext';
// import { getSingleMember } from '../api/memberData';

export default function Register() {
  // const [admin, setAdmin] = useState();

  // const { user } = useAuth();

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const checkIfAdmin = () => {
  //   getSingleMember(user.firebaseKey).then(setAdmin);
  // };

  // useEffect(() => {
  //   checkIfAdmin();
  // }, [checkIfAdmin]);
  return (<RegisterForm />);
}
