import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import BaseLayout from '../../layouts/BaseLayout';
import Styles from './JobListView-styles.js';
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
      <Styles>
        <Button color="green" onClick={() => history.push('/job/add')}>Add job</Button>
        <hr />
        <Row>
          <Col lg={true}>
            <input className="field" placeholder="Search" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
          </Col>
          <Col lg={true}>
            <JobStatusSelector allOption={true} value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)} />
          </Col>
        </Row>
        <hr />
        {
          jobList
            .filter((job) => searchAndFilter(searchText, job))
            .map((job, index) => (
              <JobListItem key={index} job={job} />
            ))
        }
      </Styles>
    </BaseLayout>
  )
}

export default JobListView;