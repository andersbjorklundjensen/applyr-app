/* eslint-disable */
import React from 'react';
import Styles from './Button-styles';

const Button = ({ onClick, children, color, fillBlock }) => {
  return (
    <Styles>
      <button 
        className={`button ${color} ${fillBlock ? 'fill' : ''}`}
        onClick={onClick}>{children}</button>
    </Styles>
  )
}

export default Button;