import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../config/api';
import { AuthContext } from '../../contexts/AuthContext';
import * as moment from 'moment';
import BaseLayout from '../../layouts/BaseLayout';
import md5 from 'md5';
import Styles from './JobView-styles';
import Button from '../../components/Button/Button';
import DownloadLink from '../../components/DownloadLink/DownloadLink';
import {
  Row,
  Col
} from 'react-bootstrap';
import getJobById from '../../api/job/getJobById';
import statusOptions from '../../config/statusOptions';
import deleteJob from '../../api/job/deleteJob';

const JobView = () => {
  const [job, setJob] = useState({});
  const { authContext } = useContext(AuthContext);
  const history = useHistory();
  const { jobId } = useParams();

  useEffect(() => {
    (async () => {
      const jobData = await getJobById(jobId, authContext.token);
      setJob({
        ...jobData,
        dateApplied: moment(job.dateApplied).format('DD.MM.YYYY')
      });
    })();
  }, []);

  const onDeleteButtonClick = async () => {
    await deleteJob(jobId, authContext.token);
    history.push('/job/list');
  }

  const { positionTitle, location, company, dateApplied,
    currentStatus, notes, linkToPosting, cvPath, coverLetterPath } = job;

  return (
    <BaseLayout>
      <Styles>
        <div className="header-wrapper">
          <h1>{positionTitle}</h1>
          <div className="header-buttons">
            <Button color={'yellow'} onClick={() => history.push(`/job/edit/${jobId}`)}>Edit</Button>
            <Button color={'red'} onClick={() => onDeleteButtonClick()}>Delete</Button>
          </div>
        </div>
        <hr />
        <Row>
          <Col lg={true}>
            <div>
              Position title: {positionTitle}
            </div>
            <div>
              Location: {location}
            </div>
            <div>
              Company: {company}
            </div>
            <div>
              Job listing link: <a href={linkToPosting}>{linkToPosting}</a>
            </div>
            <div>
              Application date: {dateApplied}
            </div>
            <div>
              Current status: {statusOptions[currentStatus]}
            </div>
            <div>
              Notes: {notes || ""}
            </div>
            <div>
              Files:
                <hr />
              {job.files && job.files.map((file, index) => (
                <div key={index}><DownloadLink url={`${api.API_URL}/upload/${file._id}`} filename={file.filename} /></div>
              ))}
            </div>
          </Col>
          <Col lg={true}>
            <div>
              {linkToPosting && <img alt="#" src={`${api.URL}/${md5(linkToPosting)}.png`} />}
            </div>
          </Col>
        </Row>
      </Styles>
    </BaseLayout>
  )
}

export default JobView;