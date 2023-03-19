import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/rooms');
        setRooms(response.data.filter(room => !room.isPrivate));
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

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
                <Link to={`/room/${room._id}`} className="btn btn-primary">
                  Join Room
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
