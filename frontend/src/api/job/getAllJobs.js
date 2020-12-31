import api from '../../config/api';

const getAllJobs = async (token) => {
  const request = await fetch(`${api.API_URL}/job/all`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  const response = await request.json();

  return response.jobs;
};

export default getAllJobs;
