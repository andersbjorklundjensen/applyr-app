import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  navigationList: string[];
  active: string;
  setActive: (link: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  navigationList,
  active,
  setActive,
}) => {
  return (
    <div className="flex flex-col">
      {navigationList?.map((link, index) => (
        <Link
          to="#"
          key={index}
          className={`px-5 py-4 transition-colors duration-200 ${
            active === link ? 'bg-gray-100 font-bold' : 'hover:bg-gray-50'
          }`}
          onClick={() => setActive(link)}
        >
          {link}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
