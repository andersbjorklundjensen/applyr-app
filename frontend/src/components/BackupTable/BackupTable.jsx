/** @jsx jsx */
import { css, jsx } from '@emotion/react'

import React from 'react';
import DownloadLink from '../DownloadLink/DownloadLink';
import api from '../../config/api';
import * as moment from 'moment';

const BackupTable = ({ backupList }) => {

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
                <DownloadLink url={`${api.API_URL}/backup/${backup._id}`} filename={backup.filename} />
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