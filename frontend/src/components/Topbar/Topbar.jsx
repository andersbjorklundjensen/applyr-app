import React, { useContext, } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Navbar,
  Nav,
} from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import Styles from './Topbar-styles';
import logout from '../../api/user/logout';

const Topbar = () => {
  const { authContext, authDispatch } = useContext(AuthContext);

  const history = useHistory();

  const onLogoutClick = async () => {
    await logout(authContext.token);
    authDispatch({
      type: 'LOGOUT'
    });
    setTimeout(() => { }, 1000);
    history.push('/');
  };

  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Brand className="logo-text">Applyr</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto nav-wrapper">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {authContext.token ? (
              <>
                <Nav.Link as={Link} to="/job/list">Job list</Nav.Link>
                <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
                <Nav.Link as={Link} to="#" onClick={() => onLogoutClick()}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Log in</Nav.Link>
                <Nav.Link as={Link} to="/register">Sign up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};

export default Topbar;
