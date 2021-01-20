/// <reference types="Cypress" />

import createRandomString from './utils/createRandomString';

describe('creating a backup', () => {
  it('Should request a backup', () => {
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

    cy.visit('http://localhost:3000/job/list')

    cy.get('.button').click();
    cy.get(':nth-child(1) > div > .field').type('positiontitle')
    cy.get(':nth-child(2) > div > .field').type('location')
    cy.get(':nth-child(3) > div > .field').type('companyname')
    cy.get(':nth-child(4) > div > .field').type('https://www.google.no/')
    cy.get(':nth-child(5) > div > .field').type('1990-01-01')
    cy.get(':nth-child(6) > .px-4').select('Rejected')
    cy.get(':nth-child(7) > div > input')
      .attachFile('example.txt');

    cy.get('.button').click();
    cy.visit('http://localhost:3000/settings')
    cy.get('.button').click();

    cy.get('table > tbody > :nth-child(1)')
  })
})