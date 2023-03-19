import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await axios.post('http://localhost:3000/api/login', { username, password });
      const { user, token } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      props.history.push('/rooms');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Card className="p-4" style={{ borderRadius: '20px', boxShadow: '0 0 10px rgba(0,0,0,.1)' }}>
        <Card.Body>
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
            </div>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">Login</Button>
            </div>
            {error && <p className="text-danger mt-3">{error}</p>}
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
