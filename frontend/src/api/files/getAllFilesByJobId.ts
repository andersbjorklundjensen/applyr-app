import api from '../../config/api';

const getAllFilesByJobId = async (jobId: string, token: string) => {
  const request = await fetch(`${api.API_URL}/files/${jobId}`, {
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

export default getAllFilesByJobId;
