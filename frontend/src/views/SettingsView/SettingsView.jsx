import React, { useContext, useState, useEffect } from 'react';
import BaseLayout from '../../layouts/BaseLayout';
import api from '../../config/api';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../../components/Button/Button';
import BackupTable from '../../components/BackupTable/BackupTable';
import Sidebar from '../../components/Sidebar/Sidebar';

const SettingsView = () => {
  const [backupList, setBackupList] = useState([]);
  const [active, setActive] = useState('Data/backup');
  const { authContext } = useContext(AuthContext);

  const getBackupList = () => {
    fetch(`${api.API_URL}/backup/list`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authContext.token,
      },
    })
      .then((response) => response.json())
      .then((response) => setBackupList(response.backups))
      .catch((e) => console.log(e));
  };

  useEffect(() => getBackupList(), []);

  const requestBackup = () => {
    fetch(`${api.API_URL}/backup/request`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authContext.token,
      },
    })
      .then(() => {
        getBackupList();
      })
      .catch((e) => console.log(e));
  };

  return (
    <BaseLayout>
      <h1 className="text-4xl font-semibold">Settings</h1>
      <hr className="my-3" />
      {/* <Sidebar navigationList={['Data/backup']} active={active} setActive={setActive} /> */}
      <div className="content">
        <div className="md:flex md:justify-between md:items-center">
          <h3 className="text-3xl font-semibold my-3">Data/backup</h3>
          <Button color="yellow" onClick={() => requestBackup()}>Request backup</Button>
        </div>
        <BackupTable backupList={backupList} />
      </div>
    </BaseLayout>
  );
};

export default SettingsView;
