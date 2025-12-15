import React, { useContext, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../state/auth/AuthContext';
import logout from '../../api/user/logout';
import { IoIosMenu } from 'react-icons/io';

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

const Topbar: React.FC = () => {
  const { authContext, authDispatch } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    await logout(authContext.token);
    authDispatch({
      type: 'LOGOUT',
    });
    setTimeout(() => {}, 1000);
    navigate('/');
  };

  const Link: React.FC<LinkProps> = ({ to, children }) => (
    <RouterLink
      className="text-xl text-gray-500 mx-4 my-3 no-underline hover:text-gray-700 transition-colors duration-200"
      to={to}
    >
      {children}
    </RouterLink>
  );

  return (
    <div className="md:flex md:justify-between">
      <div className="flex justify-between items-center px-3">
        <div className="text-4xl font-bold">Applyr</div>
        <IoIosMenu
          className="text-4xl md:hidden cursor-pointer"
          onClick={() => setShowMenu(showMenu => !showMenu)}
        />
      </div>
      <div
        className={`${
          showMenu ? '' : 'hidden'
        } flex-col flex md:flex md:flex-row`}
      >
        <Link to="/">Home</Link>
        {authContext.token ? (
          <>
            <Link to="/job/list">Job list</Link>
            <Link to="/settings">Settings</Link>
            <button
              className="text-xl text-gray-500 mx-4 my-3 no-underline bg-transparent border-none cursor-pointer hover:text-gray-700 transition-colors duration-200"
              onClick={() => onLogoutClick()}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Topbar;
