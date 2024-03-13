import { Button } from 'react-bootstrap';
import Link from 'next/link';

function Home() {
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
      <h1>Hello , Welcome to Happy Home! </h1>
      <p>Are you new here?</p>
      <Link href="/startmyteam" passHref>
        <Button id="button">Start my Team</Button>
      </Link>
      <p>Have you been here before?</p>
      <Link href="/home" passHref>
        <Button id="button">Not my first time!</Button>
      </Link>
    </div>
  );
}

export default Home;
