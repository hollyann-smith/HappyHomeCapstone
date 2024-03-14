import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleChore } from '../api/choreData';
import { getSingleMember } from '../api/memberData';

export default function ChoreCard({ choreObj, onUpdate }) {
  const [memberObj, setMemberObj] = useState({});

  const getMemberNames = () => {
    getSingleMember(choreObj.member_id).then(setMemberObj);
  };

  useEffect(() => {
    getMemberNames();
  }, []);

  const deleteThischore = () => {
    if (window.confirm(`Remove ${choreObj.name}?`)) {
      deleteSingleChore(choreObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Title>{memberObj?.name ? `${memberObj?.name}` : 'Unassigned' }</Card.Title>
      <Card.Img className="card-img" variant="top" src={choreObj?.image} alt={choreObj?.name} style={{ height: '200px' }} />
      <Card.Body>
        <Card.Title>{choreObj?.name}</Card.Title>
        <p className="card-text bold">{choreObj.isComplete && <span>COMPLETED!<br /></span> }</p>
        <div className="space-x-5 pt-2">
          <Link href={`/chore/edit/${choreObj.firebaseKey}`} passHref>
            <button className="btn-primary" type="button">{memberObj?.name ? 'EDIT' : 'ASSIGN' }</button>
          </Link>
          <Link href={`/chore/${choreObj.firebaseKey}`} passHref>
            <button className="btn-primary" type="button">VIEW</button>
          </Link>
          <button type="button" className="btn-danger" onClick={deleteThischore}>
            DELETE
          </button>
        </div>
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
    memberData: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};
