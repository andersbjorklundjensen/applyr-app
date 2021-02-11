/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import downloadBackup from '../../api/backup/downloadBackup';
import PropTypes from 'prop-types';

const BackupTable = ({
  backupList,
  token,
}: {
  backupList: any;
  token: string;
}): JSX.Element => {
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
          backupList.map((backup: any, index: number) => (
            <tr key={index}>
              <td>
                <div key={index}>
                  <div key={index}>
                    <Link
                      to="#"
                      onClick={() =>
                        downloadBackup(backup._id, backup.filename, token)
                      }
                    >
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

BackupTable.propTypes = {
  backupList: PropTypes.array,
  token: PropTypes.string,
};

export default BackupTable;
