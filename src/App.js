import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import RoomList from './components/RoomList';
import Room from './components/Room';
import HomePage from './components/HomePage';
import CreateRoomForm from './CreateRoomForm';
import PrivateChats from './PrivateChats';
import MyRooms from './MyRooms';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rooms" element={<RoomListWithNavbar />} />
          <Route path="/room/:id" element={<RoomWithNavbar />} />
          <Route path="/create-room" element={<CreateRoomFormWithNavbar />} />
          <Route path="/create-room/:id" element={<RoomWithNavbar />} />
          <Route path="/private-chats" element={<PrivateChatsWithNavbar />} />
          <Route path="/myrooms" element={<MyRoomsWithNavbar />} />
        </Routes>
      </div>
    </Router>
  );
}

function RoomListWithNavbar() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(location.pathname === '/rooms');
  
  const handleRouteChange = (location) => {
    setShowNavbar(location.pathname === '/rooms');
  };
  
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes onChange={handleRouteChange}>
        <Route path="/" element={<RoomList />} />
      </Routes>
    </>
  );
}

function RoomWithNavbar() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(location.pathname.startsWith('/room'));
  
  const handleRouteChange = (location) => {
    setShowNavbar(location.pathname.startsWith('/room'));
  };
  
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes onChange={handleRouteChange}>
        <Route path="/" element={<Room />} />
      </Routes>
    </>
  );
}

function CreateRoomFormWithNavbar() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(location.pathname === '/create-room');
  
  const handleRouteChange = (location) => {
    setShowNavbar(location.pathname === '/create-room');
  };
  
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes onChange={handleRouteChange}>
        <Route path="/" element={<CreateRoomForm />} />
      </Routes>
    </>
  );
}

function PrivateChatsWithNavbar() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(location.pathname === '/private-chats');
  
  const handleRouteChange = (location) => {
    setShowNavbar(location.pathname === '/private-chats');
  };
  
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes onChange={handleRouteChange}>
        <Route path="/" element={<PrivateChats />} />
      </Routes>
    </>
  );
}

function MyRoomsWithNavbar() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(location.pathname === '/myrooms');
  
  const handleRouteChange = (location) => {
    setShowNavbar(location.pathname === '/myrooms');
  };
  
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes onChange={handleRouteChange}>
        <Route path="/" element={<MyRooms />} />
      </Routes>
    </>
  );
}

export default App;

     