import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  navIcon: {
    color: '#fff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    marginRight: 10,
  },
  logoutButton: {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: 20,
  },
});

function NavBar() {
  const classes = useStyles();
  const [showNavLinks, setShowNavLinks] = useState(false);

  const handleToggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  // Get the user object from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  console.log(user.avatar);

  // Handle logout by deleting the token from local storage
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">Chat App</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggleNavLinks}>
        <MenuIcon className={classes.navIcon} />
      </Navbar.Toggle>

      <Navbar.Collapse id="basic-navbar-nav" className={showNavLinks ? 'show' : ''}>
        <Nav className="mr-auto">
          <Nav.Link href="/create-room" className="mr-3">
            Create Room
          </Nav.Link>
          <Nav.Link href="/rooms" className="mr-3">
            Room
          </Nav.Link>
          <Nav.Link href="/myrooms" className="mr-3">
            My Rooms
          </Nav.Link>
          <Nav.Link href="/private-chats" className="mr-3">
            Private Chats
          </Nav.Link>
        </Nav>

        <Nav className="ml-auto">
          <img src={user.avatar} alt="Avatar" className={classes.avatar} />
          <a href="#" className={classes.logoutButton} onClick={handleLogout}>
            Logout
          </a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
