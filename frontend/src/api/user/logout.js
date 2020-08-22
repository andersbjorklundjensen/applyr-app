import api from '../../config/api';

const logout = async (token) => {
  const request = await fetch(`${api.API_URL}/user/logout`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    }
  });

  const response = await request.json();

  return response;
}

export default logout;