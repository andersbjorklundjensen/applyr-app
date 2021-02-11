import React, { useState } from 'react';
import Styles from './FileInput-styles';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

interface IFileInput {
  register: any;
  name: any;
  label: any;
  id: any;
  existingFileName: any;
}

const FileInput = ({
  register,
  name,
  label,
  id,
  existingFileName,
}: IFileInput): JSX.Element => {
  const [fileName, setFileName] = useState('None');

  useEffect(() => {
    if (existingFileName) setFileName(existingFileName);
  }, [existingFileName]);

  return (
    <Styles>
      <div>
        {`${label} ${fileName} `}
        <input
          type="file"
          id={id}
          className="file-input"
          ref={register}
          name={name}
          onChange={e => {
            // @ts-ignore
            setFileName(e.target.files[0].name);
          }}
          accept=".pdf,.txt,.doc,.docx"
        />
        <label htmlFor={id} className="file-input-button">
          Choose a file...
        </label>
      </div>
    </Styles>
  );
};

FileInput.propTypes = {
  register: PropTypes.any,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  existingFileName: PropTypes.string,
};

export default FileInput;
