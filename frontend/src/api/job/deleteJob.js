import api from '../../config/api';

const deleteJob = async (jobId, token) => {
  const request = await fetch(`${api.API_URL}/job/${jobId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  })

  const response = await request.json();

  return response;
}

export default deleteJob;