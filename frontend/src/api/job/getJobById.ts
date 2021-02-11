import api from '../../config/api';

const getJobById = async (jobId: string, token: string): Promise<any> => {
  const request = await fetch(`${api.API_URL}/job/${jobId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  const response = await request.json();

  return response.job;
};

export default getJobById;
