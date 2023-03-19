import React, { useEffect, useState } from 'react';
import Room from './components/Room';
import axios from 'axios';

const MyRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rooms');
        setRooms(response.data.filter(room => !room.password));
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

  const joinRoom = (roomId) => {
    console.log(`Joining room ${roomId}`);
    // Add your join room logic here
  };

  return (
    <div className="container">
      <h2>Room List</h2>
      <div className="row">
        {rooms.map((room) => (
          <div key={room._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{room.name}</h5>
                <p className="card-text">{room.description}</p>
                <button className="btn btn-primary" onClick={() => joinRoom(room._id)}>Join Room</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRooms;
