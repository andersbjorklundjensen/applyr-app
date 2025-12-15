import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import downloadBackup from '../../api/backup/downloadBackup';

interface BackupTableProps {
  backupList: Array<{
    _id: string;
    filename: string;
    created: number;
  }>;
  token: string;
}

const BackupTable: React.FC<BackupTableProps> = ({ backupList, token }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="border-b border-gray-400">
          <td className="p-2.5">File name</td>
          <td className="p-2.5">Created</td>
        </tr>
      </thead>
      <tbody>
        {backupList &&
          backupList.map((backup, index) => (
            <tr key={index}>
              <td className="p-2.5">
                <Link
                  to="#"
                  className="text-blue-600 hover:text-blue-800 underline"
                  onClick={() =>
                    downloadBackup(backup._id, backup.filename, token)
                  }
                >
                  {backup.filename}
                </Link>
              </td>
              <td className="p-2.5">
                {moment(backup.created).format('DD.MM.YYYY hh:mm')}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BackupTable;
