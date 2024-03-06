/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <div id="mySidenav" className="sidenav">
      <Navbar className="nav flex-column">
        <Container className="nav flex-column">
          <Link passHref href="/home">
            <Navbar.Brand>HAPPY HOME</Navbar.Brand>
          </Link>
          <Link passHref href="/home">
            <Nav.Link>Home</Nav.Link>
          </Link>
          <Link passHref href="/member">
            <Nav.Link>My Team</Nav.Link>
          </Link>
          <Link passHref href="/chore">
            <Nav.Link>Chores</Nav.Link>
          </Link>
          <Button variant="danger" onClick={signOut}>Sign Out</Button>
        </Container>
      </Navbar>
    </div>
  );
}
