import React, { useContext, useEffect, useState } from 'react';
import BaseLayout from '../../layouts/BaseLayout';
import { useForm } from 'react-hook-form';
import Field from '../../components/Field/Field';
import FileInput from '../../components/FileInput/FileInput';
import Button from '../../components/Button/Button';
import statusOptions from '../../config/statusOptions';
import Styles from './JobEditView-styles';
import getJobById from '../../api/job/getJobById';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as moment from 'moment';
import editJob from '../../api/job/editJob';

const JobEditView = () => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [cv, setCv] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const history = useHistory();
  const { jobId } = useParams();
  const { authContext } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const job = await getJobById(jobId, authContext.token);
      for (let [key, value] of Object.entries(job)) {
        if (key === "dateApplied") setValue("dateApplied", moment(value).format('YYYY-MM-DD'));
        else setValue(key, value);
      }
      setCv(job.cvPath)
      setCoverLetter(job.coverLetterPath)
    })();
  }, [jobId, authContext.token, setValue]);

  const onFormSubmit = async (data) => {
    const formattedData = {
      ...data,
      dateApplied: moment(data.dateApplied).valueOf()
    };

    let formData = new FormData();
    for (let [key, value] of Object.entries(formattedData)) {
      formData.append(key, value);
    }

    formData.delete('cv');
    formData.delete('coverLetter');
    formData.append('cv', data.cv[0]);
    formData.append('coverLetter', data.coverLetter[0]);

    await editJob(jobId, formData, authContext.token);
    history.push(`/job/${jobId}`);
  }

  return (
    <BaseLayout>
      <Styles>
        <form className="job-form" onSubmit={handleSubmit(onFormSubmit)}>
          <Field register={register({ required: "Missing position title" })}
            error={errors.positionTitle} name="positionTitle"
            label="Position title:" type="text" maxLength="50" />
          <Field register={register({ required: "Missing location" })}
            error={errors.location} name="location"
            label="Location:" type="text" maxLength="50" />
          <Field register={register({ required: "Missing company name" })}
            error={errors.company} name="company"
            label="Company:" type="text" maxLength="50" />
          <Field register={register({ required: "Missing link" })}
            error={errors.linkToPosting} name="linkToPosting"
            label="Link to job ad:" type="url" maxLength="250" />
          <Field register={register({ required: "Missing application date" })}
            error={errors.dateApplied} name="dateApplied"
            label="Application date:" type="date" />
          <div>
            Current status:
            <select className="selector" ref={register} name="currentStatus">
              {statusOptions.map((option, index) => (
                <option key={index} value={index}>{option}</option>
              ))}
            </select>
          </div>
          <FileInput register={register} name="cv"
            id="cv" label="CV: " existingFileName={cv} />
          <FileInput register={register} name="coverLetter"
            id="coverLetter" label="Cover letter: " existingFileName={coverLetter} />
          <div>
            Notes: <textarea ref={register} name="notes" maxLength="5000" />
          </div>
          <div></div>
          <Button color="green" fillBlock type="submit">Save job</Button>
        </form>
      </Styles>
    </BaseLayout>
  )
}

export default JobEditView;