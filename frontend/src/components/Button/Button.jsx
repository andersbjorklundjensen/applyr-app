import React from 'react';
import Styles from './Button-styles';

interface ButtonProps {
  onClick?: any;
  children?: any;
  color?: any;
  fillBlock?: any;
  type?: any;
}

const Button = ({ onClick, children, color, fillBlock }: ButtonProps) => {
  return (
    <Styles>
      <button className={`button ${color} ${fillBlock ? 'fill' : ''}`} onClick={onClick}>
        {children}
      </button>
    </Styles>
  );
};

export default Button;
