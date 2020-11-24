import React, { useContext, useEffect, useState } from 'react';
import BaseLayout from '../../layouts/BaseLayout';
import { useForm } from 'react-hook-form';
import Field from '../../components/Field/Field';
import Button from '../../components/Button/Button';
import statusOptions from '../../config/statusOptions';
import Styles from './JobEditView-styles';
import getJobById from '../../api/job/getJobById';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import * as moment from 'moment';
import editJob from '../../api/job/editJob';
import getAllFilesByJobId from '../../api/files/getAllFilesByJobId';
import api from '../../config/api';
import DownloadLink from '../../components/DownloadLink/DownloadLink';
import deleteFileById from '../../api/files/deleteFileById';
import uploadFile from '../../api/files/uploadFile';

const JobEditView = () => {
  const { register, handleSubmit, setError, errors, setValue } = useForm();
  const [files, setFiles] = useState([]);

  const history = useHistory();
  const { jobId } = useParams();
  const { authContext } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllFilesByJobId(jobId, authContext.token);
      setFiles(data.files);
      console.log(data)
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const job = await getJobById(jobId, authContext.token);

      for (let [key, value] of Object.entries(job)) {
        if (key === "files") return;
        if (key === "dateApplied") setValue("dateApplied", moment(value).format('YYYY-MM-DD'));
        else setValue(key, value);
      }
    })();
  }, [jobId, authContext.token, setValue]);

  const onFormSubmit = async (data) => {
    const formattedData = {
      ...data,
      dateApplied: moment(data.dateApplied).valueOf()
    };

    console.log(formattedData)

    return;

    await editJob(jobId, formattedData, authContext.token);
    history.push(`/job/${jobId}`);
  }

  const onDeleteFileClick = async (fileId) => {
    const { data, error } = await deleteFileById(fileId, authContext.token);
    console.log(data)
    console.log(error)
    const { data: data2, error: error2 } = await getAllFilesByJobId(jobId, authContext.token);
    setFiles(data2.files);
  }

  const onFileChange = async (file) => {
    const { data } = await uploadFile(file, jobId, authContext.token);
    const { data: data2, error: error2 } = await getAllFilesByJobId(jobId, authContext.token);
    setFiles(data2.files);
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
            Files:
            {files && files.map((file) => (
            <div className="flex justify-between">
              <div><DownloadLink url={`${api.API_URL}/file/${file._id}`} filename={file.filename} /></div>
              <div onClick={() => onDeleteFileClick(file._id)}>X</div>
            </div>
          ))}
            <input type="file" onChange={(e) => onFileChange(e.target.files[0])} />
          </div>
          <div>
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