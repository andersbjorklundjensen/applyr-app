import api from '../../config/api';

const getBackupList = async (token) => {
  const request = await fetch(`${api.API_URL}/backup/list`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  })

  const response = await request.json();

  return {
    data: response,
    error: response.message,
  }
};

export default getBackupList;