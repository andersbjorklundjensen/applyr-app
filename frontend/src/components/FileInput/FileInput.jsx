import React, { useState } from 'react';
import Styles from './FileInput-styles';

const FileInput = ({ label, onChange, id }) => {
  const [fileName, setFileName] = useState('None');

  return (
    <Styles>
      <div>
        {`${label} ${fileName} `}
        <input type="file" id={id}
          className="file-input"
          onChange={(e) => {
            setFileName(e.target.files[0].name)
            onChange(e);
          }} accept=".pdf,.txt,.doc,.docx" />
        <label htmlFor={id} className="file-input-button">Choose a file...</label>
      </div>
    </Styles>
  )
}

export default FileInput;