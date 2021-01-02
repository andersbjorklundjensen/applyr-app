/// <reference types="Cypress" />

import api from '../../../src/config/api';

describe('Register view functionality', () => {
  it('should register a user', () => {
    cy.visit('http://localhost:3000/register');
    cy.get(':nth-child(1) > div > .field').type('username1');
    cy.get(':nth-child(2) > div > .field').type('password1');
    cy.get('.w-full').click()

    cy.intercept('POST', `${api.API_URL}/user/username`, {
      statusCode: 200,
      body: {
        usernameExists: false
      }
    }).as('postUsername');
    cy.wait('@postUsername');

    cy.intercept('POST', `${api.API_URL}/user/register`, {
      statusCode: 200,
      body: {
        token: 'token'
      }
    }).as('postRegister');
    cy.wait('@postRegister');

    cy.url()
      .should('eq', 'http://localhost:3000/')
      .then(() => expect(localStorage.getItem('job-app:auth')).to.eql( JSON.stringify({
        username: 'username1',
        token: 'token'
      })));
  })
})