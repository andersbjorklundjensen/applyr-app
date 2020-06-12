import React from 'react';
import Styles from './JobStatusSelector-styles';

const JobStatusSelector = ({ allOption, value, onChange }) => {
  return (
    <Styles>
      <select className="selector" value={value} onChange={onChange}>
        {allOption && <option value="0">All</option>}
        <option value="1">Applied</option>
        <option value="2">Interviewing</option>
        <option value="3">Under review</option>
        <option value="4">Offer received</option>
        <option value="5">Rejected</option>
      </select>
    </Styles>
  )
}

export default JobStatusSelector;