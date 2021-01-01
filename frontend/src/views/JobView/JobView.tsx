/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import md5 from 'md5';
import moment from 'moment';
import api from '../../config/api';
import { AuthContext } from '../../state/auth/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Button from '../../components/Button/Button';
import DownloadLink from '../../components/DownloadLink/DownloadLink';
import getJobById from '../../api/job/getJobById';
import statusOptions from '../../config/statusOptions';
import deleteJob from '../../api/job/deleteJob';
import getAllFilesByJobId from '../../api/files/getAllFilesByJobId';
import IJob from '../../types/IJob';

const JobView = () => {
  const [job, setJob] = useState<IJob>({} as IJob);
  const [files, setFiles] = useState([]);
  const { authContext } = useContext(AuthContext);
  const history = useHistory();
  const { jobId }: { jobId: string } = useParams();

  useEffect(() => {
    (async () => {
      const jobData = await getJobById(jobId, authContext.token);
      setJob({
        ...jobData,
        dateApplied: moment(job.dateApplied).format('DD.MM.YYYY'),
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await getAllFilesByJobId(jobId, authContext.token);
      setFiles(data.files);
    })();
  }, []);

  const onDeleteButtonClick = async () => {
    await deleteJob(jobId, authContext.token);
    history.push('/job/list');
  };

  const {
    positionTitle, location, company, dateApplied,
    currentStatus, notes, linkToPosting,
  } = job;

  return (
    <BaseLayout>
      <div className="md:flex md:justify-between">
        <h1 className="text-3xl font-semibold mb-3">{positionTitle}</h1>
        <div
          className="flex mb-3"
          css={css`
            margin: 0 -0.25rem; 
            * { margin: 0 0.25rem }`}
        >
          <Button color="yellow" onClick={() => history.push(`/job/edit/${jobId}`)}>Edit</Button>
          <Button color="red" onClick={() => onDeleteButtonClick()}>Delete</Button>
        </div>
      </div>
      <hr />
      <div className="md:flex md:justify-center">
        <div className="md:w-1/2">
          <div>
            <span className="font-semibold">Position title:</span>
            {positionTitle}
          </div>
          <div>
            <span className="font-semibold">Location:</span>
            {location}
          </div>
          <div>
            <span className="font-semibold">Company:</span>
            {company}
          </div>
          <div>
            <span className="font-semibold">Job listing link:</span>
            <a href={linkToPosting}>{linkToPosting}</a>
          </div>
          <div>
            <span className="font-semibold">Application date:</span>
            {dateApplied}
          </div>
          <div>
            <span className="font-semibold">Current status:</span>
            {statusOptions[currentStatus]}
          </div>
          <div>
            <span className="font-semibold">Notes:</span>
            {notes || ''}
          </div>
          <hr />
          <div>
            <span className="font-semibold">Files:</span>
            {files && files.map((file, index) => (
              // eslint-disable-next-line 
              // @ts-ignore
              <div key={index}><DownloadLink fileId={file._id} filename={file.originalFilename} /></div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 overflow-y-scroll max-h-80">
          {linkToPosting && <img alt="" className="w-full" src={`${api.URL}/${md5(linkToPosting)}.png`} />}
        </div>
      </div>
    </BaseLayout>
  );
};

export default JobView;
