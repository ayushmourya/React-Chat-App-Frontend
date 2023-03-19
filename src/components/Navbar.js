import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  navIcon: {
    color: '#fff',
  },
});

function NavBar() {
  const classes = useStyles();
  const [showNavLinks, setShowNavLinks] = useState(false);

  const handleToggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">Chat App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggleNavLinks}>
        <MenuIcon className={classes.navIcon} />
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav" className={showNavLinks ? 'show' : ''}>
        <Nav className="mr-auto">
          <Nav.Link href="/create-room">Create Room</Nav.Link>
          <Nav.Link href="/rooms">Rooms</Nav.Link>
          <Nav.Link href="/myrooms">My Rooms</Nav.Link>
          <Nav.Link href="/private-chats">Private Chats</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
