import api from '../../config/api';

const login = async (username, password) => {
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
