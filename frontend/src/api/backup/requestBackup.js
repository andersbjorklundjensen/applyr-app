import api from '../../config/api';

const requestBackup = async token => {
  const request = await fetch(`${api.API_URL}/backup/request`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  const response = await request.json();

  return {
    data: response,
    error: response.message,
  };
};

export default requestBackup;
