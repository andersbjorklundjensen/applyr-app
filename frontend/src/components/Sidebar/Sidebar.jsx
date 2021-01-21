import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './Sidebar-styles';

const Sidebar = ({ navigationList, active, setActive }) => {
  return (
    <Styles>
      <div className="navigation">
        {navigationList &&
          navigationList.map((link, index) => (
            <Link to="#" key={index} className={active === link ? 'active' : ''} onClick={() => setActive(link)}>
              {link}
            </Link>
          ))}
      </div>
    </Styles>
  );
};

export default Sidebar;
