import api from '../../config/api';

const uploadFile = async (file, jobId, token) => {
  const formData = new FormData();
  formData.append('file', file);

  const request = await fetch(`${api.API_URL}/file/${jobId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: token,
    },
    body: formData,
  });

  const response = await request.json();

  return {
    data: response,
  };
};

export default uploadFile;
