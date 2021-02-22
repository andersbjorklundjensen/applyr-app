/// <reference types="Cypress" />

import constants from './utils/constants';
import createRandomString from './utils/createRandomString';

describe('registering a user, logging out and logging in', () => {
  it('', () => {
    const username = createRandomString(8);
    const password = createRandomString(8);

    cy.visit(`${constants.baseUrl}/register`);
    cy.get(':nth-child(1) > div > .field').type(username);
    cy.get(':nth-child(2) > div > .field').type(password);
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

    cy.get('.hidden > [href="/login"]').click();

    cy.get(':nth-child(1) > div > .field').type(username);
    cy.get(':nth-child(2) > div > .field').type(password);
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
});
