import React, { useContext, useState, useEffect } from 'react';
import BaseLayout from '../../layouts/BaseLayout';
import { AuthContext } from '../../state/auth/AuthContext';
import Button from '../../components/Button/Button';
import BackupTable from '../../components/BackupTable/BackupTable';
import getBackupList from '../../api/backup/getBackupList';
import requestBackup from '../../api/backup/requestBackup';

const SettingsView = (): JSX.Element => {
  const [backupList, setBackupList] = useState([]);
  // @ts-ignore
  const { authContext } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const { data } = await getBackupList(authContext.token);
      setBackupList(data.backups);
    })();
  }, []);

  const onRequestBackupClick = async () => {
    await requestBackup(authContext.token);
    const { data: data2 } = await getBackupList(authContext.token);
    setBackupList(data2.backups);
  };

  return (
    <BaseLayout>
      <h1 className="text-4xl font-semibold">Settings</h1>
      <hr className="my-3" />
      <div className="content">
        <div className="md:flex md:justify-between md:items-center">
          <h3 className="text-3xl font-semibold my-3">Data/backup</h3>
          <Button color="yellow" onClick={() => onRequestBackupClick()}>
            Request backup
          </Button>
        </div>
        <BackupTable backupList={backupList} token={authContext.token} />
      </div>
    </BaseLayout>
  );
};

export default SettingsView;
