import React from 'react';
import {useNavigate} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import LockIcon from '@material-ui/icons/Lock';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    // backgroundImage: `url(${process.env.PUBLIC_URL + '/chat-bg.jpg'})`,
    backgroundColor: '#3f51b5',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
  },
  title: {
    fontWeight: 700,
    fontSize: '3rem',
    color: '#fff',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  button: {
    fontSize: '1.2rem',
    borderRadius: '50px',
    textTransform: 'capitalize',
    color: '#fff',
    padding: theme.spacing(1.5, 4),
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    margin: theme.spacing(1),
  },
  icon: {
    fontSize: '3rem',
    color: '#fff',
    marginBottom: theme.spacing(1),
  },
  feature: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: theme.spacing(2),
  },
  content: { // new CSS class for content area
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    maxWidth: '800px',
    width: '100%',
  },
}));

const Home = () => {
  const classes = useStyles();
 const naviagte= useNavigate();

  const handleRegisterClick = () => {
    naviagte('/register');
  };

  const handleLoginClick = () => {
    naviagte('/login');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4} justifyContent="center" className={classes.content}>
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.title}>
            ChatApp
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" className={classes.button} onClick={handleRegisterClick}>
              Register
            </Button>
            <Button variant="outlined" color="primary" className={classes.button} onClick={handleLoginClick}>
              Login
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes.feature}>
            <ChatBubbleIcon className={classes.icon} />
            <Typography variant="h4">Group Chat</Typography>
            <Typography variant="body1">Chat with multiple people at once.</Typography>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes.feature}>
            <LockIcon className={classes.icon} />
            <Typography variant="h4">Privacy Guarantee</Typography>
            <Typography variant="body1">Your conversations are safe and secure.</Typography>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes.feature}>
            <GroupIcon className={classes.icon} />
            <Typography variant="h4">Person Chat</Typography>
            <Typography variant="body1">Chat with a single person.</Typography>
            </div>
        </Grid>
        <Grid item xs={6} sm={3}>
            <div className={classes.feature}>
                <InsertDriveFileIcon className={classes.icon} />
                <Typography variant="h4">File Sharing</Typography>
                <Typography variant="body1">Share files with your friends.</Typography>
            </div>
        </Grid>
        </Grid>
    </div>
    );
};

export default Home;
