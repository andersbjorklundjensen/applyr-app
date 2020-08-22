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
        dateApplied: moment(job.dateApplied).format('YYYY-MM-DD')
      });
    })();
  }, []);

  const onDeleteButtonClick = () => { }

  const getAndSetJob = () => {
    job.getJobById(jobId)
      .then((response) => {
        const { job } = response;
        setPositionTitle(job.positionTitle);
        setLocation(job.location)
        setCompany(job.company)
        setLink(job.linkToPosting)

        let now = moment(job.dateApplied).format('YYYY-MM-DD');

        setDateApplied(now)
        setCurrentStatus(job.currentStatus)
        setNotes(job.notes)
        setCvPath(job.cvPath);
        setCoverLetterPath(job.coverLetterPath)
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => getAndSetJob(), []);

  const onSaveButtonClick = () => {
    job.editJob(jobId, {
      positionTitle,
      location,
      company,
      dateApplied: Date.parse(dateApplied),
      currentStatus: parseInt(currentStatus),
      notes,
      linkToPosting: link
    })
      .then((response) => {
        setEditState(false);
      })
      .catch((e) => console.log(e));
  }

  const onDeleteButtonClick = () => {
    job.deleteJob(jobId)
      .then((response) => {
        history.push('/job/list');
      })
      .catch((e) => console.log(e));
  }

  return (
    <BaseLayout>
      <Styles>
        <div className="header-wrapper">
          <h1>{positionTitle}</h1>
          <div className="header-buttons">
            {editState ? (
              <Button color={'green'} onClick={() => onSaveButtonClick()}>Save</Button>
            ) : (
                <Fragment>
                  <Button color={'yellow'} onClick={() => setEditState(true)}>Edit</Button>
                  <Button color={'red'} onClick={() => onDeleteButtonClick()}>Delete</Button>
                </Fragment>
              )}
          </div>
        </div>
        <hr />
        <Row>
          <Col lg={true}>
            <EditAbleField label="Position title: " editState={editState} value={positionTitle}
              onChange={(e) => setPositionTitle(e.target.value)} />
            <EditAbleField label="Location: " editState={editState} value={location}
              onChange={(e) => setLocation(e.target.value)} />
            <EditAbleField label="Company: " editState={editState} value={company}
              onChange={(e) => setCompany(e.target.value)} />
            <EditAbleField link label="Job listing link: " editState={editState} value={link}
              onChange={(e) => setLink(e.target.value)} maxLength="250" type="url" />
            <EditAbleField label="Application date: " editState={editState} value={dateApplied}
              onChange={(e) => setDateApplied(e.target.value)} type="date" />
            <div>
              Current status:
        {editState ? (
                <JobStatusSelector value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)} />
              ) : (
                  jobStatuses[currentStatus]
                )}
            </div>
            <div>
              Notes:
        {editState ? (
                <textarea value={notes || ""} onChange={(e) => setNotes(e.target.value)} maxLength="5000" />
              ) : (
                  notes || ""
                )}
            </div>
            <div>
              Files:
      <hr />
              <FileInputRevamped
                label="CV: "
                documentType={'cv'}
                jobId={jobId}
                filename={cvPath}
                afterUpload={() => getAndSetJob()}
                afterDelete={() => setCvPath('')}
              />
              <FileInputRevamped
                label="Cover letter: "
                documentType={'coverLetter'}
                jobId={jobId}
                filename={coverLetterPath}
                afterUpload={() => getAndSetJob()}
                afterDelete={() => setCoverLetterPath('')}
              />
            </div>
          </Col>
          <Col lg={true}>
            <div>
              {link && <img alt="#" src={`${api.URL}/${md5(link)}.png`} />}
            </div>
          </Col>
        </Row>
      </Styles>
    </BaseLayout>
  )
}

export default JobView;