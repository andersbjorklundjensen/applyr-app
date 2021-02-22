/// <reference types="Cypress" />

import constants from './utils/constants';
import createRandomString from './utils/createRandomString';

describe('registering a user', () => {
  it('should register a user', () => {
    const username = createRandomString(8);
    cy.visit(`${constants.baseUrl}/register`);
    cy.get(':nth-child(1) > div > .field').type(username);
    cy.get(':nth-child(2) > div > .field').type(createRandomString(8));
    cy.get('.w-full').click();

    cy.url()
      .should('eq', `${constants.baseUrl}/`)
      .then(() =>
        expect(localStorage.getItem('job-app:auth'))
          .to.include('username')
          .to.include(username)
          .to.include('token'),
      );
  });

  it('should not register a user with an already existing username', () => {
    const username = createRandomString(8);
    cy.visit(`${constants.baseUrl}/register`);
    cy.get(':nth-child(1) > div > .field').type(username);
    cy.get(':nth-child(2) > div > .field').type(createRandomString(8));
    cy.get('.w-full').click();

    cy.url()
      .should('eq', `${constants.baseUrl}/`)
      .then(() =>
        expect(localStorage.getItem('job-app:auth'))
          .to.include('username')
          .to.include(username)
          .to.include('token'),
      );

    cy.get('button.text-xl').click();

    cy.visit(`${constants.baseUrl}/register`);
    cy.get(':nth-child(1) > div > .field').type(username);
    cy.get(':nth-child(2) > div > .field').type(createRandomString(8));
    cy.get('.w-full').click();

    cy.get('.justify-center').contains('Username is taken!');
  });
});
