import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BaseLayout from '../../layouts/BaseLayout';
import { HeroText, HeroImage, CTAButton } from './HomeView-styles';

const HomeView = () => (
  <BaseLayout>
    <Row>
      <Col lg>
        <h1>Simple job tracking</h1>
        <h3>Dont waste time keeping track of job applications</h3>
        <HeroText className="hero-text">
          When searching for a job, sending out an application is quick.
          Being organized and knowing where you are in the process with
          each of them can be a challenge.
          Let Applyr help you with this problem.
          </HeroText>
        <CTAButton className="cta-button" to="/register">Get started!</CTAButton>
      </Col>
      <Col>
        <HeroImage alt="#" src="/img/hero-image.jpg" />
      </Col>
    </Row>
  </BaseLayout>
);

export default HomeView;
