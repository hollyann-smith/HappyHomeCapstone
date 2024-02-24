import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleMember } from '../api/memberData';

export default function MemberCard({ memberObj, onUpdate }) {
  const deleteThismember = () => {
    if (window.confirm(`Remove ${memberObj.name}?`)) {
      deleteSingleMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };
  console.warn(memberObj, 'memberObj');

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img class="card-img" variant="top" src={memberObj?.image} alt={memberObj?.name} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>{memberObj?.name}</Card.Title>
        <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
          <Button id="button" variant="info">EDIT</Button>
        </Link>
        <Button id="button" variant="danger" onClick={deleteThismember} className="m-2" style={{ height: '20px' }}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
