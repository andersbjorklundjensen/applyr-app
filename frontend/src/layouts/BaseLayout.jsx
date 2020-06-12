import React from 'react';
import Topbar from '../components/Topbar/Topbar';
import Styles from './BaseLayout-styles.js';
import { Container } from 'react-bootstrap';

const BaseLayout = ({ children }) => {
  return (
    <Styles>
      <Container>
        <div className="topbar-wrapper">
          <Topbar />
        </div>
        {children}
      </Container>
    </Styles>
  )
}

export default BaseLayout;