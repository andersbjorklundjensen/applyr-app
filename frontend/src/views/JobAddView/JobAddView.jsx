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

  const onFormSubmit = async (data) => {
    let formData = new FormData();

    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    formData.delete('cv');
    formData.delete('coverLetter');
    formData.append('cv', data.cv[0]);
    formData.append('coverLetter', data.coverLetter[0]);

    await addJob(formData, authContext.token);
    history.push('/job/list');
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