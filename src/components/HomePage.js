import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
          <h1>Welcome to Chat App</h1>
          <div className="list-group mt-5">
            <Link to="/create-room" className="list-group-item list-group-item-action">Create Room</Link>
            <Link to="/chats" className="list-group-item list-group-item-action">Chats</Link>
            <Link to="/rooms" className="list-group-item list-group-item-action">Rooms</Link>
            <Link to="/account" className="list-group-item list-group-item-action">Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
