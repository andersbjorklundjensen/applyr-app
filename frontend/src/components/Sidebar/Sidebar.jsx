import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './Sidebar-styles';
import PropTypes from 'prop-types';

Sidebar.propTypes = {
  navigationList: PropTypes.array,
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

const Sidebar = ({ navigationList, active, setActive }) => {
  return (
    <Styles>
      <div className="navigation">
        {navigationList &&
          navigationList.map((link, index) => (
            <Link
              to="#"
              key={index}
              className={active === link ? 'active' : ''}
              onClick={() => setActive(link)}
            >
              {link}
            </Link>
          ))}
      </div>
    </Styles>
  );
};

export default Sidebar;
