import React, { useState } from 'react';

interface IFileInputMultiple {
  register: any;
  name: any;
}

const FileInputMultiple = ({
  register,
  name,
}: IFileInputMultiple): JSX.Element => {
  const [files, setFiles] = useState([]);

  return (
    <div>
      Files:
      {files.map((file, index) => (
        <div key={index}>{file}</div>
      ))}
      <input
        type="file"
        multiple
        ref={register}
        name={name}
        onChange={e => {
          const newFiles = [];

          for (const [key, value] of Object.entries(e.target.files)) {
            newFiles.push(value.name);
          }

          setFiles(newFiles);
        }}
      />
    </div>
  );
};

export default FileInputMultiple;
