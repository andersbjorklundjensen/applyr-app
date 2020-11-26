import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import BaseLayout from '../../layouts/BaseLayout';
import Button from '../../components/Button/Button';
import JobListItem from '../../components/JobListItem/JobListItem';
import JobStatusSelector from '../../components/JobStatusSelector/JobStatusSelector';
import {
  Row,
  Col
} from 'react-bootstrap';
import getAllJobs from '../../api/job/getAllJobs';

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

  const searchAndFilter = (searchText, job) => {
    const filter = () => {
      if (parseInt(searchStatus) === 0) return true;
      if (job.currentStatus === parseInt(searchStatus)) return true;

      return false;
    }

    const search = () => {
      const positionTitleMatch = job.positionTitle.toLowerCase().indexOf(searchText) === -1 ? false : true;
      const companyMatch = job.company.toLowerCase().indexOf(searchText) === -1 ? false : true;
      const locationMatch = job.location.toLowerCase().indexOf(searchText) === -1 ? false : true;

      if (positionTitleMatch || companyMatch || locationMatch) return true;

      return false;
    }

    const match = () => {
      if (filter() && search()) return true;

      return false;
    }

    return match();
  };

  return (
    <BaseLayout>
      <Button color="green" onClick={() => history.push('/job/add')}>Add job</Button>
      <hr className="border-2 border-gray-300 my-3" />
      <div className="md:flex md:justify-between -mx-2">
        <div className="md:w-1/2 mx-2">
          <input className="w-full bg-gray-200 rounded-xl my-2 py-2.5 px-4"
            placeholder="Search" type="text" value={searchText}
            onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <div className="md:w-1/2 mx-2">
          <JobStatusSelector allOption={true} value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)} />
        </div>
      </div>
      <hr className="border-2 border-gray-300 my-3" />
      {jobList
        .filter((job) => searchAndFilter(searchText, job))
        .map((job, index) => (
          <JobListItem key={index} job={job} />
        ))
      }
    </BaseLayout>
  )
}

export default JobListView;