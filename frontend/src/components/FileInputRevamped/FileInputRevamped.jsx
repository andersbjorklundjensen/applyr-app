import React, { useContext } from 'react';
import Styles from './FileInputRevamped-styles';
import Upload from '../../api/Upload';
import { AuthContext } from '../../contexts/AuthContext';
import DownloadLink from '../../components/DownloadLink/DownloadLink';
import api from '../../config/api';

const FileInputRevamped = ({ label, documentType, jobId, filename, afterUpload, afterDelete }) => {
  const { authContext } = useContext(AuthContext);
  const upload = new Upload(authContext.token);

  const saveButtonClick = (file) => {
    let formData = new FormData();
    formData.append(documentType, file);
    upload.uploadFiles(jobId, formData)
    .then(() => {
        afterUpload();
      })
      .catch(e => console.log(e));
  }

  const deleteFile = () => {
    upload.deleteFile(jobId, documentType)
      .then(() => {
        afterDelete();
      })
      .catch((e) => console.log(e));
  }

  return (
    <Styles>
      <div className="wrapper">
        <div>
          {`${label} `}
          <DownloadLink url={`${api.API_URL}/upload/${filename}`} filename={filename} />
          <input type="file" id={documentType}
            className="file-input"
            onChange={(e) => {
              saveButtonClick(e.target.files[0])
            }} accept=".pdf,.txt,.doc,.docx" />
        </div>
        <div>
          <label htmlFor={documentType}><img alt="#" className="icons" src="/img/upload-icon.png" /></label>
          <img alt="#" src="/img/trash-icon.svg" className="icons"
            onClick={() => deleteFile()} />
        </div>
      </div>
    </Styles>
  )
}

export default FileInputRevamped;