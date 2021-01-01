/* eslint-disable */
import React from 'react';
import Styles from './Field-styles';

interface FieldProps {

}

const Field = ({ register, error, name, placeholder, label, maxLength, type, min }) => {
  return (
    <Styles>
      <div>
        {label && label}
        <input
          ref={register}
          name={name}
          placeholder={placeholder}
          className="field"
          maxLength={maxLength}
          type={type}
          min={min}
        />
        {error && error.message}
      </div>
    </Styles>
  )
}

export default Field;