import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import { Menu as MenuIcon, Create as CreateIcon, Chat as ChatIcon } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      backgroundColor: '#1976d2',
      zIndex: theme.zIndex.drawer + 1,
      marginBottom: '20px'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'space-between',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: theme.spacing(8), // add margin to push content below navbar
    },
    avatar: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      marginRight: theme.spacing(2),
      marginLeft: 'auto',
    },
    logoutButton: {
      color: '#fff',
      textDecoration: 'none',
    },
  }));


function NavBar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Get the user object from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  // Handle logout by deleting the token from local storage
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const drawerItems = [
    { text: 'Create Room', icon: <CreateIcon />, path: '/create-room' },
    { text: 'Room', icon: <ChatIcon />, path: '/rooms' },
    { text: 'My Rooms', icon: <ChatIcon />, path: '/myrooms' },
    { text: 'Private Chats', icon: <ChatIcon />, path: '/private-chats' },
  ];

  return (
    <div className={classes.root}>
<AppBar position="static" className={classes.appBar}>
  <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleToggleDrawer}>
      <MenuIcon />
    </IconButton>
    <Typography variant="h6">Chat App</Typography>
    <Avatar src={user.avatar} alt="Avatar" className={classes.avatar} />
    <Button color="inherit" onClick={handleLogout} className={classes.logoutButton}>
      Logout
    </Button>
  </Toolbar>
</AppBar>
      <Drawer className={classes.drawer} variant="temporary" anchor="left" open={isDrawerOpen} onClose={handleToggleDrawer} classes={{ paper: classes.drawerPaper }}>
        <div className={classes.drawerHeader}>
          <Typography variant="h6">Menu</Typography>
          <IconButton onClick={handleToggleDrawer}>
            <MenuIcon />
          </IconButton>
        </div>
        <List>
          {drawerItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default NavBar;