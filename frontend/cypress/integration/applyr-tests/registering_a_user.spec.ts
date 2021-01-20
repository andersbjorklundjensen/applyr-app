/// <reference types="Cypress" />

import createRandomString from './utils/createRandomString';

describe('registering a user', () => {
  it('should register a user', () => {
    const username = createRandomString(8);
    cy.visit('http://localhost:3000/register');
    cy.get(':nth-child(1) > div > .field').type(username);
    cy.get(':nth-child(2) > div > .field').type(createRandomString(8));
    cy.get('.w-full').click()

    cy.url()
      .should('eq', 'http://localhost:3000/')
      .then(() => expect(localStorage.getItem('job-app:auth'))
      .to.include('username')
      .to.include(username)
      .to.include('token'));
  })
})