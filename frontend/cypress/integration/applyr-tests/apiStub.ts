import api from '../../../src/config/api';

export const postUsername = () => {
  cy.intercept('POST', `${api.API_URL}/user/username`, {
    statusCode: 200,
    body: {
      usernameExists: false
    }
  }).as('postUsername');
}

export const postRegister = () => {
  cy.intercept('POST', `${api.API_URL}/user/register`, {
    statusCode: 200,
    body: {
      token: 'token'
    }
  }).as('postRegister');
}

export const getBackupList = () => {
  cy.intercept('GET', `${api.API_URL}/backup/list`, {
    statusCode: 200,
    body: {
      backups: [
        { _id: 1, filename: 'filename1', created: 123 }
      ]
    }
  }).as('getBackupList');
}