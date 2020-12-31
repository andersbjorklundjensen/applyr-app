/* eslint-disable */
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'

import React, { useContext, Fragment, useState } from 'react';
import { Link as RLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../state/auth/AuthContext';
import logout from '../../api/user/logout';
import { IoIosMenu } from 'react-icons/io';

const Topbar = () => {
  const { authContext, authDispatch } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  const history = useHistory();

  const onLogoutClick = async () => {
    await logout(authContext.token);
    authDispatch({
      type: 'LOGOUT'
    });
    setTimeout(() => { }, 1000);
    history.push('/');
  };

  const Link = ({ to, children }) => (
    <RLink
      className="text-xl text-gray-500 mx-4 my-3 no-underline"
      css={css`&:hover { text-decoration: none; }`}
      to={to}>{children}</RLink>
  )

  return (
    <div className="md:flex md:justify-between">
      <div className="flex justify-between items-center px-3">
        <div className="text-4xl font-bold">Applyr</div>
        <IoIosMenu className="text-4xl md:hidden" onClick={() => setShowMenu(showMenu => !showMenu)} />
      </div>
      <div
        className={`${showMenu ? '' : 'hidden'} flex-col flex md:flex md:flex-row`}
      >
        <Link to="/">Home</Link>
        {authContext.token ? (
          <Fragment>
            <Link to="/job/list">Job list</Link>
            <Link to="/settings">Settings</Link>
            <button className="text-xl text-gray-500 mx-4 my-3 no-underline"
              onClick={() => onLogoutClick()}>Logout</button>
          </Fragment>
        ) : (
            <Fragment>
              <Link to="/login">Log in</Link>
              <Link to="/register">Sign up</Link>
            </Fragment>
          )}
      </div>
    </div>
  );
};

export default Topbar;
