import api from '../../config/api';
import IApiResponse from '../../types/IApiResponse';

const login = async (
  username: string,
  password: string,
): Promise<IApiResponse> => {
  const request = await fetch(`${api.API_URL}/user/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const response = await request.json();

  return {
    data: response,
    error: response.message,
  };
};

export default login;
