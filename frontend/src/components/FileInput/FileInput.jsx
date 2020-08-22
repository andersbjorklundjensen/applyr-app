import React, { useState } from 'react';
import Styles from './FileInput-styles';
import { useEffect } from 'react';

const FileInput = ({ register, name, label, id, existingFileName }) => {
  const [fileName, setFileName] = useState('None');

  useEffect(() => {
    if (existingFileName) setFileName(existingFileName);
  }, [existingFileName])

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