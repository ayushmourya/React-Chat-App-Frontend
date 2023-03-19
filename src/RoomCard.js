import React from 'react';
import { Card, Button } from 'react-bootstrap';

function RoomCard({ room }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{room?.name}</Card.Title>
        <Card.Text>{room?.description}</Card.Text>
        <Button variant="primary" href={`/room/${room?.id}`}>
          Join Room
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RoomCard;
