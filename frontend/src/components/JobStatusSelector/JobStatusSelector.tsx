import React from 'react';

interface JobStatusSelectorProps {
  allOption: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const JobStatusSelector: React.FC<JobStatusSelectorProps> = ({
  allOption,
  value,
  onChange,
}) => {
  return (
    <select
      className="w-full px-5 py-3 my-2 bg-gray-100 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={value}
      onChange={onChange}
    >
      {allOption && <option value="0">All</option>}
      <option value="1">Applied</option>
      <option value="2">Interviewing</option>
      <option value="3">Under review</option>
      <option value="4">Offer received</option>
      <option value="5">Rejected</option>
    </select>
  );
};

export default JobStatusSelector;
