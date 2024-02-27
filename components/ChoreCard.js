import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { deleteSingleChore } from '../api/choreData';
import { viewMemberDetails } from '../api/mergedData';

export default function ChoreCard({ choreObj, onUpdate }) {
  const [assignedMember, setAssignedMember] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  // console.warn(assignedMember, 'assignedMember');
  useEffect(() => {
    viewMemberDetails(firebaseKey).then(setAssignedMember);
  }, [firebaseKey]);

  const deleteThischore = () => {
    if (window.confirm(`Remove ${choreObj.name}?`)) {
      deleteSingleChore(choreObj.firebaseKey).then(() => onUpdate());
    }
  };
  // console.warn(choreObj, 'choreObj');

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Title>{assignedMember.choreObject?.name}</Card.Title>
      <Card.Img className="card-img" variant="top" src={choreObj?.image} alt={choreObj?.name} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>{choreObj?.name}</Card.Title>
        <p className="card-text bold">{choreObj.isComplete && <span>COMPLETED!<br /></span> }</p>
        <Link href={`/chore/edit/${choreObj.firebaseKey}`} passHref>
          <Button id="button" variant="info">EDIT</Button>
        </Link>
        <Button id="button" variant="danger" onClick={deleteThischore} className="m-2" style={{ height: '20px' }}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ChoreCard.propTypes = {
  choreObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    isComplete: PropTypes.bool,
    member_id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
