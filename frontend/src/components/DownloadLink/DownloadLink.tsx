import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import download from 'downloadjs';
import { AuthContext } from '../../state/auth/AuthContext';
import api from '../../config/api';

const DownloadLink = ({
  fileId,
  filename,
}: {
  fileId: any;
  filename: string;
}): JSX.Element => {
  // @ts-ignore
  const { authContext } = useContext(AuthContext);

  const downloadFile = () => {
    fetch(`${api.API_URL}/file/${fileId}`, {
      method: 'GET',
      headers: {
        Authorization: authContext.token,
      },
    })
      .then(res => res.blob())
      .then(blob => {
        download(blob, filename);
      })
      .catch(e => console.log(e));
  };

  return (
    <Link to="#" onClick={() => downloadFile()}>
      {filename}
    </Link>
  );
};

export default DownloadLink;
