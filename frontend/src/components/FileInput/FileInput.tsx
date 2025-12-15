import React, { useState, useEffect } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FileInputProps {
  register: UseFormRegisterReturn;
  name: string;
  label: string;
  id: string;
  existingFileName?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  register,
  name,
  label,
  id,
  existingFileName,
}) => {
  const [fileName, setFileName] = useState('None');

  useEffect(() => {
    if (existingFileName) setFileName(existingFileName);
  }, [existingFileName]);

  return (
    <div className="my-2">
      <span className="mr-2">
        {label} <span className="font-medium">{fileName}</span>
      </span>
      <input
        type="file"
        id={id}
        className="hidden"
        {...register}
        name={name}
        onChange={e => {
          if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
          }
        }}
        accept=".pdf,.txt,.doc,.docx"
      />
      <label
        htmlFor={id}
        className="inline-block px-6 py-2.5 text-white bg-blue-300 rounded-full cursor-pointer hover:bg-blue-400 transition-colors duration-200"
      >
        Choose a file...
      </label>
    </div>
  );
};

export default FileInput;
