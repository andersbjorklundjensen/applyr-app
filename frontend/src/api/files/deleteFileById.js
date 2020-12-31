import api from '../../config/api';

const deleteFileById = async (fileId, token) => {
  const request = await fetch(`${api.API_URL}/file/${fileId}`, {
    method: 'DELETE',
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

export default deleteFileById;
