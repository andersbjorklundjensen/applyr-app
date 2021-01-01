/* eslint-disable */
/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'

import React, { useContext } from 'react';
import DownloadLink from '../DownloadLink/DownloadLink';
import api from '../../config/api';
import moment from 'moment';
import { AuthContext } from '../../state/auth/AuthContext'
import download from 'downloadjs';
import { Link } from 'react-router-dom';

const BackupTable = ({ backupList }) => {
  const { authContext } = useContext(AuthContext);

  const downloadFile = (backupId, filename) => {
    fetch(`${api.API_URL}/backup/${backupId}`, {
      method: 'GET',
      headers: {
        'Authorization': authContext.token
      }
    })
      .then(res => res.blob())
      .then(blob => {
        download(blob, filename);
      })
      .catch((e) => console.log(e));
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="border-b border-gray-400">
          <td>File name</td>
          <td>Created</td>
        </tr>
      </thead>
      <tbody css={css`td { padding: 10px; }`}>
        {backupList && backupList.map((backup, index) => (
          <tr key={index}>
            <td>
              <div key={index}>
                <div key={index}><Link to="#" onClick={() => downloadFile(backup._id, backup.filename)}>{backup.filename}</Link></div>
              </div>
            </td>
            <td>
              {moment(backup.created).format('DD.MM.YYYY hh:mm')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BackupTable;