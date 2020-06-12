import React from 'react';
import Styles from './JobListItem-styles';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

const JobListItem = ({ job }) => {
  const jobStatuses = ["", "Applied", "Interviewing", "Under review", "Offer received", "Rejected"];
  return (
    <Styles>
      <div className="job-list-item">
        <div className="job-location">
          <Link to={`/job/${job._id}`}>
            Position title: {job.positionTitle}
          </Link>
        </div>
        <div className="job-list-item-row">
          <div>
            Company: {job.company}
          </div>
          <div>
            Location: {job.location}
          </div>
          <div>
            Application date: {moment(job.dateApplied).format('DD.MM.YYYY')}
          </div>
        </div>
        <div className="job-list-item-row">
          <div>
            Current status: {jobStatuses[job.currentStatus]}
          </div>
          <div>
            Link to job ad: {job.linkToPosting}
          </div>
        </div>
      </div>
    </Styles>
  )
}

export default JobListItem;