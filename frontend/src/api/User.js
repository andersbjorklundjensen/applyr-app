import api from '../config/api';

export default class User {
  constructor(apiToken) {
    this.apiToken = apiToken;
  }

  callApi(method, route, body) {
    console.log(`${method} ${route} ${body}`);

    if (body) {
      return fetch(`${api.API_URL}${route}`, {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.apiToken,
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json());
    }

    return fetch(`${api.API_URL}${route}`, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.apiToken,
      },
    })
      .then((response) => response.json());
  }

  register(username, password) {
    return this.callApi('POST', '/user/register', {
      username,
      password,
    });
  }

  logout() {
    return this.callApi('POST', '/user/logout', null);
  }
}
