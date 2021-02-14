import React, { useContext, useEffect, useState } from 'react';
import BaseLayout from '../../layouts/BaseLayout';
import { useForm } from 'react-hook-form';
import Field from '../../components/Field/Field';
import Button from '../../components/Button/Button';
import statusOptions from '../../config/statusOptions';
import getJobById from '../../api/job/getJobById';
import { useParams, useHistory } from 'react-router-dom';
import { AuthContext } from '../../state/auth/AuthContext';
import moment from 'moment';
import editJob from '../../api/job/editJob';
import getAllFilesByJobId from '../../api/files/getAllFilesByJobId';
import DownloadLink from '../../components/DownloadLink/DownloadLink';
import deleteFileById from '../../api/files/deleteFileById';
import uploadFile from '../../api/files/uploadFile';
import IJob from '../../types/IJob';

const JobEditView = () => {
  const { register, handleSubmit, setError, errors, setValue } = useForm();
  const [files, setFiles] = useState([]);

  const history = useHistory();
  const { jobId }: { jobId: string } = useParams();
  // @ts-ignore
  const { authContext } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { data, error } = await getAllFilesByJobId(
        jobId,
        authContext.token,
      );
      setFiles(data.files);
      console.log(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const job = await getJobById(jobId, authContext.token);

      for (const [key, value] of Object.entries(job)) {
        if (key === 'files') return;
        if (key === 'dateApplied')
          setValue('dateApplied', moment(value as number).format('YYYY-MM-DD'));
        else setValue(key, value);
      }
    })();
  }, [jobId, authContext.token, setValue]);

  const onFormSubmit = async (data: IJob) => {
    const formattedData = {
      ...data,
      dateApplied: moment(data.dateApplied).valueOf(),
    };

    await editJob(jobId, formattedData, authContext.token);
    history.push(`/job/${jobId}`);
  };

  const onDeleteFileClick = async (fileId: any) => {
    const { data, error } = await deleteFileById(fileId, authContext.token);
    console.log(data);
    console.log(error);
    const { data: data2, error: error2 } = await getAllFilesByJobId(
      jobId,
      authContext.token,
    );
    setFiles(data2.files);
  };

  const onFileChange = async (file: any) => {
    const { data } = await uploadFile(file, jobId, authContext.token);
    const { data: data2, error: error2 } = await getAllFilesByJobId(
      jobId,
      authContext.token,
    );
    setFiles(data2.files);
  };

  return (
    <BaseLayout>
      <form
        className="md:grid md:grid-cols-2 md:gap-x-6"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <Field
          register={register({ required: 'Missing position title' })}
          error={errors.positionTitle}
          name="positionTitle"
          label="Position title:"
          type="text"
          maxLength="50"
        />
        <Field
          register={register({ required: 'Missing location' })}
          error={errors.location}
          name="location"
          label="Location:"
          type="text"
          maxLength="50"
        />
        <Field
          register={register({ required: 'Missing company name' })}
          error={errors.company}
          name="company"
          label="Company:"
          type="text"
          maxLength="50"
        />
        <Field
          register={register({ required: 'Missing link' })}
          error={errors.linkToPosting}
          name="linkToPosting"
          label="Link to job ad:"
          type="url"
          maxLength="250"
        />
        <Field
          register={register({ required: 'Missing application date' })}
          error={errors.dateApplied}
          name="dateApplied"
          label="Application date:"
          type="date"
        />
        <div>
          Current status:
          <select
            className="px-4 py-2.5 my-2 bg-gray-200 w-full rounded-xl"
            ref={register}
            name="currentStatus"
          >
            {statusOptions.map((option, index) => (
              <option key={index} value={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          Files:
          {files &&
            files.map((file: any, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <DownloadLink
                    fileId={file._id}
                    filename={file.originalFilename}
                  />
                </div>
                <div onClick={() => onDeleteFileClick(file._id)}>X</div>
              </div>
              // eslint-disable-next-line
            ))}
          <input
            type="file"
            onChange={(e: any) => onFileChange(e.target.files[0])}
          />
        </div>
        <div />
        <div>
          Notes:
          <textarea
            className="px-4 py-2.5 my-2 bg-gray-200 w-full rounded-xl"
            ref={register}
            name="notes"
            maxLength={5000}
          />
        </div>
        <div />
        <Button color="green" fillBlock type="submit">
          Save job
        </Button>
      </form>
    </BaseLayout>
  );
};

export default JobEditView;
