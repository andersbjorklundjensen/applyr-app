/** @jsx jsx */
import { css, jsx } from '@emotion/react'

import React, { useContext, Fragment, useState } from 'react';
import { Link as RLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
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
    <RLink className="text-lg text-gray-500 mx-3 my-2" to={to}>{children}</RLink>
  )

  return (
    <div>
      <div className="flex justify-between items-center px-3">
        <div className="text-4xl font-bold">Applyr</div>
        <IoIosMenu className="text-4xl" onClick={() => setShowMenu(showMenu => !showMenu)} />
      </div>
      <div
        className="flex-col flex"
        css={css`display: ${showMenu ? '' : 'none'};`}
      >
        <Link to="/">Home</Link>
        {authContext.token ? (
          <Fragment>
            <Link to="/job/list">Job list</Link>
            <Link to="/settings">Settings</Link>
            <Link to="#" onClick={() => onLogoutClick()}>Logout</Link>
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
