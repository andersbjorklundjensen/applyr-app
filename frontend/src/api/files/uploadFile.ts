import api from '../../config/api';
import IApiResponse from '../../types/IApiResponse';

const uploadFile = async (
  file: any,
  jobId: string,
  token: string,
): Promise<IApiResponse> => {
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
