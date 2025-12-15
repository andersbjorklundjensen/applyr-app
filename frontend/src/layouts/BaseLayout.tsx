import React from 'react';
import Topbar from '../components/Topbar/Topbar';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 max-w-[1110px]">
      <div className="mt-6 mb-14">
        <Topbar />
      </div>
      {children}
    </div>
  );
};

export default BaseLayout;
