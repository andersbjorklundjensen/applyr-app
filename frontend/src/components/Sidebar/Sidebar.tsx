import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './Sidebar-styles';
import PropTypes from 'prop-types';

interface ISidebar {
  navigationList: any;
  active: any;
  setActive: any;
}

const Sidebar = ({
  navigationList,
  active,
  setActive,
}: ISidebar): JSX.Element => {
  return (
    <Styles>
      <div className="navigation">
        {navigationList &&
          // @ts-ignore
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

Sidebar.propTypes = {
  navigationList: PropTypes.array,
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

export default Sidebar;
