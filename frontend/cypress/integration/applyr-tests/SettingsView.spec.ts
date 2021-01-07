/// <reference types="Cypress" />

import api from "../../../src/config/api";
import { getBackupList, postRegister, postUsername } from "./apiStub";

describe('Settings view functionality', () => {
  it('Should request a backup', () => {
    localStorage.setItem('job-app:auth', JSON.stringify({ token: 'token' }));
    cy.visit('http://localhost:3000/settings');

    getBackupList();
    cy.wait('@getBackupList');

    cy.get('.button').click();

    cy.intercept('POST', `${api.API_URL}/backup/request`, {
      statusCode: 200,
      body: {

      }
    }).as('postRequestBackup');
    cy.wait('@postRequestBackup');
  })
})