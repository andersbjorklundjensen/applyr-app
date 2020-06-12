import React, { useContext, useState, useEffect } from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import BaseLayout from '../../layouts/BaseLayout';
import api from '../../config/api';
import { AuthContext } from '../../contexts/AuthContext';
import Button from '../../components/Button/Button';
import BackupTable from '../../components/BackupTable/BackupTable';
import Sidebar from '../../components/Sidebar/Sidebar';
import Styles from './SettingsView-styles';

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
      <Styles>
        <h1>Settings</h1>
        <hr />
        <Row>
          <Col xl={3} md={3}>
            <Sidebar navigationList={['Data/backup']} active={active} setActive={setActive} />
          </Col>
          <Col lg>
            <div className="content">
              <div className="title">
                <h3>Data/backup</h3>
                <Button color="yellow" onClick={() => requestBackup()}>Request backup</Button>
              </div>
              <BackupTable backupList={backupList} />
            </div>
          </Col>
        </Row>
      </Styles>
    </BaseLayout>
  );
};

export default SettingsView;
