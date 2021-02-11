import api from '../../config/api';
import IApiResponse from '../../types/IApiResponse';

const getBackupList = async (token: string): Promise<IApiResponse> => {
  const request = await fetch(`${api.API_URL}/backup/list`, {
    method: 'GET',
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

export default getBackupList;
