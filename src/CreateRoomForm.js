import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AddBox as CreateRoomIllustration } from '@mui/icons-material';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0069D9',
    },
    background: {
      default: '#F4F4F4',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const CreateRoomForm = () => {

  // check if the user is logged in or not, if not redirect to login page
  // check localstorage for token and if not present redirect to login page

  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
  }




  const location = useLocation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/rooms', {
        name,
        description,
        password,
      });

      const roomId = response.data._id;
      if (response.data.isPrivate) {
        const isPasswordCorrect = prompt('Please enter the password for this room:');
        if (isPasswordCorrect === password) {
          // Update the URL with the new room ID
          const newUrl = `/room/${roomId}`;
          window.history.pushState(null, '', newUrl);
        } else {
          alert('Incorrect password!');
        }
      } else {
        // Update the URL with the new room ID
        const newUrl = `/room/${roomId}`;
        window.history.pushState(null, '', newUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box sx={{ display: 'flex', maxWidth: 600, width: '100%', m: 2, p: 3, boxShadow: 3, borderRadius: 10, bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%' }}>
            <CreateRoomIllustration sx={{ width: '100%', height: '100%' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: '50%', ml: 3 }}>
            <Typography variant="h4" gutterBottom>Create a New Room</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password (optional)"
                variant="outlined"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button type="submit" variant="contained" sx={{ mt: 2 }} color="primary">
                Create Room
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CreateRoomForm;