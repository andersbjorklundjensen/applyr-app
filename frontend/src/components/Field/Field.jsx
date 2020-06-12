import React from 'react';
import Styles from './Field-styles';

const Field = ({ placeholder, label, value, onChange, maxLength, type, min }) => {
  return (
    <Styles>
      <div>
        {label && label}
        <input
          placeholder={placeholder}
          className="field"
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          type={type}
          min={min}
        />
      </div>
    </Styles>
  )
}

export default Field;