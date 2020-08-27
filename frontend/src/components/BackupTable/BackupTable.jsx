import React from 'react';
import Styles from './BackupTable-styles';
import DownloadLink from '../DownloadLink/DownloadLink';
import api from '../../config/api';
import * as moment from 'moment';

const BackupTable = ({ backupList }) => {

  return (
    <Styles>
      <table className="table">
        <thead>
          <tr className="table-header">
            <td>File name</td>
            <td>Created</td>
          </tr>
        </thead>
        <tbody>
          {backupList && backupList.map((backup, index) => (
            <tr key={index}>
              <td>
                <div key={index}>
                  <DownloadLink url={`${api.API_URL}/backup/${backup.filename}`} filename={backup.filename} />
                </div>
              </td>
              <td>
                {moment(backup.created).format('DD.MM.YYYY hh:mm')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Styles>
  )
}

export default BackupTable;