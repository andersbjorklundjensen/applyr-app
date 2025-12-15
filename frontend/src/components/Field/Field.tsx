import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FieldProps {
  register?: UseFormRegisterReturn;
  error?: { message?: string };
  name?: string;
  placeholder?: string;
  label?: string;
  maxLength?: number;
  type?: string;
  min?: number | string;
}

const Field: React.FC<FieldProps> = ({
  register,
  error,
  name,
  placeholder,
  label,
  maxLength,
  type = 'text',
  min,
}) => {
  return (
    <div className="mb-2">
      {label && (
        <label className="block mb-1 font-medium text-gray-700">{label}</label>
      )}
      <input
        {...register}
        name={name}
        placeholder={placeholder}
        className="w-full px-5 py-3 my-2 bg-gray-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        maxLength={maxLength}
        type={type}
        min={min}
      />
      {error?.message && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default Field;
