import api from '../../config/api';

const addJob = async (formData, token) => {
  const request = await fetch(`${api.API_URL}/job`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: token,
    },
    body: formData,
  });

  const response = await request.json();

  return response;
};

export default addJob;
