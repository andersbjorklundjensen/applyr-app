import React from 'react';
import Field from '../Field/Field';
import Styles from './EditAbleField-styles';

const EditAbleField = ({ link, label, value, onChange, editState, maxLength = "50", type = 'text' }) => {
  return (
    <Styles>
      <div>
        <div className="label">{label}</div>
        {editState ?
          (<Field
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            type={type}
          />)
          :
          (
            link ? (<a href={value}>{value}</a>) : (value)
          )
        }
      </div>
    </Styles>
  )
}
export default EditAbleField;