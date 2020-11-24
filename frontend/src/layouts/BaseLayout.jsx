import React from 'react';
import Topbar from '../components/Topbar/Topbar';
import Styles from './BaseLayout-styles.js';
import { Container } from 'react-bootstrap';

const BaseLayout = ({ children }) => {
  return (
    <Styles>
      <div className="container max-w-screen-xl">
        <div className="topbar-wrapper">
          <Topbar />
        </div>
        {children}
      </div>
    </Styles>
  )
}

export default BaseLayout;