import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello , {user.displayName} Welcome to Happy Home! </h1>
      <p>Are you new here?</p>
      <Link href="/register" passHref>
        <Button>Start my Team</Button>
      </Link>
    </div>
  );
}

export default Home;
