import api from '../../config/api';

const editJob = async (jobId, body, token) => {
  const request = await fetch(`${api.API_URL}/job/${jobId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(body)
  })

  const response = await request.json();
  
  return response;
}

export default editJob;