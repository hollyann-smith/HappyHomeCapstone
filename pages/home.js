import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import happyhomehand from '../public/photos/happyhomehand.png';

export default function Home() {
  return (
    <div id="page">
      <div id="home">
        <Image
          className="home"
          src={happyhomehand}
          width={400}
          height={400}
          alt="happyhomehand"
        />
      </div>
      <Link passHref href="/member">
        <Button id="button" style={{ height: '80px' }}>My Team</Button>
      </Link>
      <Link passHref href="/chore">
        <Button id="button" style={{ height: '80px' }}>Chores</Button>
      </Link>

    </div>
  );
}
