import api from '../../config/api';
import IApiResponse from '../../types/IApiResponse';

const isUsernameTaken = async (username: string): Promise<IApiResponse> => {
  const request = await fetch(`${api.API_URL}/user/username`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
    }),
  });

  const response = await request.json();
  return {
    data: response,
    error: response.message,
  };
};

export default isUsernameTaken;
