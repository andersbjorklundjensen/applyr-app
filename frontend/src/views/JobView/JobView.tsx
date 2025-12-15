import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const JobView: React.FC = () => {
  const [job, setJob] = useState<IJob>({} as IJob);
  const [files, setFiles] = useState<any[]>([]);
  const { authContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();

  useEffect(() => {
    if (!jobId) return;
    (async () => {
      const jobData = await getJobById(jobId, authContext.token);
      setJob({
        ...jobData,
        dateApplied: moment(jobData.dateApplied).format('DD.MM.YYYY'),
      });
    })();
  }, [jobId, authContext.token]);

  useEffect(() => {
    if (!jobId) return;
    (async () => {
      const { data } = await getAllFilesByJobId(jobId, authContext.token);
      setFiles(data.files);
    })();
  }, [jobId, authContext.token]);

  const onDeleteButtonClick = async () => {
    if (!jobId) return;
    await deleteJob(jobId, authContext.token);
    navigate('/job/list');
  };

  const {
    positionTitle,
    location,
    company,
    dateApplied,
    currentStatus,
    notes,
    linkToPosting,
  } = job;

  return (
    <BaseLayout>
      <div className="md:flex md:justify-between">
        <h1 className="text-3xl font-semibold mb-3">{positionTitle}</h1>
        <div className="flex mb-3 gap-2">
          <Button color="yellow" onClick={() => navigate(`/job/edit/${jobId}`)}>
            Edit
          </Button>
          <Button color="red" onClick={() => onDeleteButtonClick()}>
            Delete
          </Button>
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
            {files &&
              files.map((file: any, index) => (
                // eslint-disable-next-line
                // @ts-ignore
                <div
                  key={index}
                  className="bg-gray-100 py-3 px-4 border-2 border-gray-300 my-2"
                >
                  <DownloadLink
                    fileId={file._id}
                    filename={file.originalFilename}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="md:w-1/2 overflow-y-scroll max-h-80">
          {linkToPosting && (
            <img
              alt=""
              className="w-full"
              src={`${api.URL}/${md5(linkToPosting)}.png`}
            />
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default JobView;
