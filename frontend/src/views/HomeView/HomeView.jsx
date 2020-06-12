import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import BaseLayout from '../../layouts/BaseLayout';
import Styles from './HomeView-styles';

const HomeView = () => (
  <BaseLayout>
    <Styles>
      <Row>
        <Col lg>
          <h1>Simple job tracking</h1>
          <h3>Dont waste time keeping track of job applications</h3>
          <p className="hero-text">
            When searching for a job, sending out an application is quick.
            Being organized and knowing where you are in the process with
            each of them can be a challenge.
            Let Applyr help you with this problem.
          </p>
          <Link className="cta-button" to="/register">Get started!</Link>
        </Col>
        <Col>
          <img alt="#" src="/img/hero-image.jpg" />
        </Col>
      </Row>
    </Styles>
  </BaseLayout>
);

export default HomeView;
