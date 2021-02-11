import React from 'react';
import Styles from './Field-styles';

interface FieldProps {
  register?: any;
  error?: any;
  name?: any;
  placeholder?: any;
  label?: any;
  maxLength?: any;
  type?: any;
  min?: any;
  minLength?: any;
}

const Field = ({
  register,
  error,
  name,
  placeholder,
  label,
  maxLength,
  type,
  min,
}: FieldProps): JSX.Element => {
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
  );
};

export default Field;
