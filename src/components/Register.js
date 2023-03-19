import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // import your CSS file

ReactModal.setAppElement('#root');

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // perform client-side validation
    if (!username || !email || !password ) {
      console.log("All fields are required");
      return;
    }
  
    setShowModal(true);
  
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);
  
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
      setShowModal(false);
    } catch (error) {
      console.error(error);
      setShowModal(false);
      useNavigate = ('/login');
    }
  }


  
  

  const cardStyle = {
    width: '400px',
    height: '550px',
    margin: '0 auto',
    backgroundColor: '#f2f2f2',
    borderRadius: '30px',
    boxShadow: '20px 20px 60px #c8c8c8, -20px -20px 60px #ffffff'
  };

  const gradientBg = {
    background: 'linear-gradient(to bottom right, #f5d5e5, #c5c5c5)'
  };

  const avatarStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    margin: '0 auto',
    display: 'block'
  };

  return (
    <div style={gradientBg}>
      <div className="container py-5">
        <div className="card" style={cardStyle}>
          <div className="card-body">
            <h1 className="text-center mb-4">Register</h1>
            <ReactModal
              isOpen={showModal}
              onRequestClose={() => setShowModal(false)}
              className="modal-content"
              overlayClassName="modal-overlay"
            >
              <div className="modal-text">Wait few seconds, user is being created...</div>
            </ReactModal>
            {isUserCreated && <div className="text-center mb-4">User created!</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" className="form-control" value={username} onChange={handleUsernameChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" className="form-control" value={email} onChange={handleEmailChange} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" className="form-control" value={password} onChange={handlePasswordChange} />
              </div>
              <div className="form-group">
                <label htmlFor="avatar">Avatar:</label>
                <input type="file" id="avatar" name="avatar" className="form-control" onChange={handleAvatarChange} />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
