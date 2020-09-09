import React, { useContext, useEffect, useState } from 'react';
import BaseLayout from '../../layouts/BaseLayout';
import { useForm } from 'react-hook-form';
import Field from '../../components/Field/Field';
import FileInputMultiple from '../../components/FileInputMultiple/FileInputMultiple';
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
  const [alreadyUploadedFiles, setAlreadyUploadedFiles] = useState([]);

  const history = useHistory();
  const { jobId } = useParams();
  const { authContext } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const job = await getJobById(jobId, authContext.token);

      const files = job.files.map((file) => ({
        ...file,
        delete: false,
      }))

      setAlreadyUploadedFiles(files);
      for (let [key, value] of Object.entries(job)) {
        if (key === "files") return;
        if (key === "dateApplied") setValue("dateApplied", moment(value).format('YYYY-MM-DD'));
        else setValue(key, value);
      }
    })();
  }, [jobId, authContext.token, setValue]);

  const onFormSubmit = async (data) => {
    const filesToBeDeleted = JSON.stringify(alreadyUploadedFiles
      .filter((file) => file.delete)
      .map((file) => file._id));

    const formattedData = {
      ...data,
      filesToBeDeleted: filesToBeDeleted,
      dateApplied: moment(data.dateApplied).valueOf()
    };

    let formData = new FormData();
    for (let [key, value] of Object.entries(formattedData)) {
      formData.append(key, value);
    }

    if (data.files) {
      formData.delete('files');
      for (let [key, value] of Object.entries(data.files)) {
        formData.append('files', value);
      }
    }
    
    await editJob(jobId, formData, authContext.token);
    history.push(`/job/${jobId}`);
  }

  const setFileToBeDeleted = (fileId) => {
    const newFiles = alreadyUploadedFiles.map((file) => {
      if (file._id == fileId) {
        return ({
          ...file,
          delete: !file.delete
        })
      } else {
        return file;
      }
    })

    setAlreadyUploadedFiles(newFiles);
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
          <div>
            <FileInputMultiple register={register} name="files" />
          </div>
          <div>
            Already uploaded files:
            {alreadyUploadedFiles.map((file) => (
            <div>
              <span style={file.delete ? { textDecoration: 'line-through' } : {}}>{file.filename}</span>
              <img onClick={() => setFileToBeDeleted(file._id)} src="/img/trash-icon.svg" alt="" />
            </div>
          ))}
          </div>
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