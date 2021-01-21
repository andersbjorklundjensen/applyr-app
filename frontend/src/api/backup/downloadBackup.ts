import download from 'downloadjs';
import api from '../../config/api';

const downloadBackup = (backupId: string, filename: string, token: string) => {
  fetch(`${api.API_URL}/backup/${backupId}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
    .then(res => res.blob())
    .then(blob => {
      download(blob, filename);
    })
    .catch(e => console.log(e));
};

export default downloadBackup;
