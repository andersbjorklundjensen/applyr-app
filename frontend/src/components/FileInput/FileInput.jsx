import React, { useState } from 'react';
import Styles from './FileInput-styles';

const FileInput = ({ register, name, label, id }) => {
  const [fileName, setFileName] = useState('None');

  return (
    <Styles>
      <div>
        {`${label} ${fileName} `}
        <input type="file" id={id}
          className="file-input"
          ref={register}
          name={name}
          onChange={(e) => {
            setFileName(e.target.files[0].name)
          }} accept=".pdf,.txt,.doc,.docx" />
        <label htmlFor={id} className="file-input-button">Choose a file...</label>
      </div>
    </Styles>
  )
}

export default FileInput;