import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../state/auth/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Button from '../../components/Button/Button';
import JobListItem from '../../components/JobListItem/JobListItem';
import JobStatusSelector from '../../components/JobStatusSelector/JobStatusSelector';
import getAllJobs from '../../api/job/getAllJobs';
import IJob from '../../types/IJob';

const JobListView = () => {
  const [jobList, setJobList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchStatus, setSearchStatus] = useState(0);

  const { authContext } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const allJobs = await getAllJobs(authContext.token);
      setJobList(allJobs);
    })();
  }, [authContext.token]);

  const searchAndFilter = (job: IJob) => {
    const filter = () => {
      // eslint-disable-next-line
      if (searchStatus === 0) return true;
      // eslint-disable-next-line
      if (job.currentStatus === searchStatus) return true;

      return false;
    };

    const search = () => {
      // eslint-disable-next-line
      const positionTitleMatch = job.positionTitle.toLowerCase().indexOf(searchText) === -1 ? false : true;
      // eslint-disable-next-line
      const companyMatch = job.company.toLowerCase().indexOf(searchText) === -1 ? false : true;
      // eslint-disable-next-line
      const locationMatch = job.location.toLowerCase().indexOf(searchText) === -1 ? false : true;

      if (positionTitleMatch || companyMatch || locationMatch) return true;

      return false;
    };

    const match = () => {
      if (filter() && search()) return true;

      return false;
    };

    return match();
  };

  return (
    <BaseLayout>
      <Button color="green" onClick={() => history.push('/job/add')}>Add job</Button>
      <hr className="border-t border-gray-400 my-3" />
      <div className="md:flex md:justify-between -mx-2">
        <div className="md:w-1/2 mx-2">
          <input
            className="w-full bg-gray-200 rounded-xl my-2 py-2.5 px-4"
            placeholder="Search"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="md:w-1/2 mx-2">
          <JobStatusSelector
            allOption
            value={searchStatus}
            onChange={(e: any) => setSearchStatus(e.target.value)}
          />
        </div>
      </div>
      <hr className="border-t border-gray-400 my-3" />
      {jobList && jobList
        .filter((job) => searchAndFilter(job))
        .map((job, index) => (
          // eslint-disable-next-line
          <JobListItem key={index} job={job} />
        ))}
    </BaseLayout>
  );
};

export default JobListView;
