import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import PropTypes from 'prop-types';

const JobListItem = ({ job }: { job: any }): JSX.Element => {
  const jobStatuses = [
    '',
    'Applied',
    'Interviewing',
    'Under review',
    'Offer received',
    'Rejected',
  ];

  return (
    <div className="bg-gray-100 px-4 py-2 my-4 rounded-lg border-2 border-blue-200 overflow-x-scroll">
      <div className="text-2xl text-blue-500">
        <Link to={`/job/${job._id}`}>Position title: {job.positionTitle}</Link>
      </div>
      <div className="md:flex md:justify-between">
        <div>Company: {job.company}</div>
        <div>Location: {job.location}</div>
        <div>
          Application date: {moment(job.dateApplied).format('DD.MM.YYYY')}
        </div>
      </div>
      <div className="">
        <div>Current status: {jobStatuses[job.currentStatus]}</div>
        <div>Link to job ad: {job.linkToPosting}</div>
      </div>
    </div>
  );
};

JobListItem.propTypes = {
  job: PropTypes.object,
};

export default JobListItem;
