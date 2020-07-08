import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeroText = styled.p`
  margin: 40px 0;
  width: 80%;
`;

export const HeroImage = styled.img`
  margin-top: 30px;
  width: 100%;
`;

export const CTAButton = styled(Link)`
  border: none;
  border-radius: 125px;
  padding: 15px 30px;
  background-color: #E24F54;
  background-color: #f6cd42;
  color: #111;
`;