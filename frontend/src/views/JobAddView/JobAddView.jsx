import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Field from '../../components/Field/Field';
import Styles from './JobAddView-styles';
import FileInput from '../../components/FileInput/FileInput';
import Button from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import addJob from '../../api/job/addJob';
import statusOptions from '../../config/statusOptions';

const JobAddView = () => {
  const { register, handleSubmit, errors } = useForm();
  const { authContext } = useContext(AuthContext);
  const history = useHistory();

  const { authContext } = useContext(AuthContext);

  const upload = new Upload(authContext.token);
  const job = new Job(authContext.token);

  const onFormSubmit = async (e) => {
    e.preventDefault();
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
            <select className="selector" ref={register} name="currentStatus">
              {statusOptions.map((option, index) => (
                <option value={index}>{option}</option>
              ))}
            </select>
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