/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useContext } from 'react';
import moment from 'moment';
import { AuthContext } from '../../state/auth/AuthContext';
import { Link } from 'react-router-dom';
import downloadBackup from '../../api/backup/downloadBackup';

const BackupTable = ({ backupList }) => {
  const { authContext } = useContext(AuthContext);

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="border-b border-gray-400">
          <td>File name</td>
          <td>Created</td>
        </tr>
      </thead>
      <tbody
        css={css`
          td {
            padding: 10px;
          }
        `}
      >
        {backupList &&
          backupList.map((backup, index) => (
            <tr key={index}>
              <td>
                <div key={index}>
                  <div key={index}>
                    <Link to="#" onClick={() => downloadBackup(backup._id, backup.filename, authContext.token)}>
                      {backup.filename}
                    </Link>
                  </div>
                </div>
              </td>
              <td>{moment(backup.created).format('DD.MM.YYYY hh:mm')}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BackupTable;
