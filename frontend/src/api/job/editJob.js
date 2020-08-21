import api from '../../config/api';

const editJob = async (jobId, body, token) => {
  const request = await fetch(`${api.API_URL}/job/${jobId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': token,
    },
    body
  })

  const response = await request.json();
  
  return response;
}

export default editJob;