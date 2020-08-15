import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Field from '../../components/Field/Field';
import JobStatusSelector from '../../components/JobStatusSelector/JobStatusSelector';
import Styles from './JobAddView-styles';
import Job from '../../api/Job';
import FileInput from '../../components/FileInput/FileInput';
import Upload from '../../api/Upload';
import Button from '../../components/Button/Button';
import api from '../../config/api';

const JobAddView = () => {
  const [positionTitle, setPositionTitle] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [currentStatus, setCurrentStatus] = useState(1);
  const [notes, setNotes] = useState('');
  const [link, setLink] = useState('');
  const [cv, setCv] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);

  const history = useHistory();

  const { authContext } = useContext(AuthContext);

  const upload = new Upload(authContext.token);
  const job = new Job(authContext.token);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    job.addJob({
      positionTitle,
      location,
      company,
      dateApplied: Date.parse(dateApplied),
      currentStatus: parseInt(currentStatus),
      notes,
      linkToPosting: link
    })
      .then((response) => {
        if (cv || coverLetter) {
          uploadFiles(response.jobId)
        }
        history.push('/job/list');
      })
  }

  const uploadFiles = (jobId) => {
    let formData = new FormData();
    formData.append('cv', cv);
    formData.append('coverLetter', coverLetter);
    formData.append('positionTitle', positionTitle);
    formData.append('location', location);
    formData.append('company', company);
    formData.append('dateApplied', Date.parse(dateApplied));
    formData.append('currentStatus', parseInt(currentStatus));
    formData.append('notes', notes);
    formData.append('linkToPosting', link);

    upload.uploadFiles(jobId, formData)
      .catch(e => console.log(e));
    await fetch(`${api.API_URL}/job`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': authContext.token,
      },
      body: formData
    })
      .then((response) => {
        history.push('/job/list');
      })
  }

  return (
    <BaseLayout>
      <Styles>
        <form className="job-form" onSubmit={(e) => onFormSubmit(e)}>
          <Field label="Position title:" type="text" value={positionTitle} onChange={(e) => setPositionTitle(e.target.value)} maxLength="50" />
          <Field label="Location:" type="text" value={location} onChange={(e) => setLocation(e.target.value)} maxLength="50" />
          <Field label="Company:" type="text" value={company} onChange={(e) => setCompany(e.target.value)} maxLength="50" />
          <Field label="Link to job ad:" type="url" value={link} onChange={(e) => setLink(e.target.value)} maxLength="250" />
          <Field label="Application date:" type="date" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} />
          <div>
            Current status:
          <JobStatusSelector value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)} />
          </div>
          <FileInput id="cv" label="CV: " onChange={(e) => setCv(e.target.files[0])} />
          <FileInput id="coverLetter" label="Cover letter: " onChange={(e) => setCoverLetter(e.target.files[0])} />
          <div>
            Notes: <textarea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength="5000" />
          </div>
          <div></div>
          <Button color="green" fillBlock type="submit">Add job</Button>
        </form>
      </Styles>
    </BaseLayout >
  )
}

export default JobAddView;