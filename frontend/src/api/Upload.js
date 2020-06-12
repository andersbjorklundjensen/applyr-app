import download from 'downloadjs';
import api from '../config/api';

export default class Upload {
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

  downloadFile(filename) {
    fetch(`${api.API_URL}/upload/${filename}`, {
      method: 'GET',
      headers: {
        Authorization: this.apiToken,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        download(blob, filename);
      })
      .catch((e) => console.log(e));
  }

  uploadFiles(jobId, formData) {
    return fetch(`${api.API_URL}/upload/${jobId}`, {
      method: 'PUT',
      headers: {
        Authorization: this.apiToken,
      },
      body: formData,
    });
  }

  deleteFile(jobId, documentType) {
    return fetch(`${api.API_URL}/upload/${jobId}/${documentType}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.apiToken,
      },
    });
  }
}
