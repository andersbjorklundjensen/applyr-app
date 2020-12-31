/* eslint-disable */
import React, { useState } from 'react';

const FileInputMultiple = ({ register, name }) => {
  const [files, setFiles] = useState([]);

  return (
    <div>
      Files:
      {files.map((file, index) => (
        <div key={index}>{file}</div>
      ))}
      <input type="file" multiple ref={register} name={name} onChange={(e) => {
        let newFiles = [];

        for (const [key, value] of Object.entries(e.target.files)) {
          newFiles.push(value.name)
        }

        setFiles(newFiles)
      }} />
    </div>
  )
}

export default FileInputMultiple;