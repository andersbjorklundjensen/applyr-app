/// <reference types="Cypress" />

import createRandomString from './utils/createRandomString';
import constants from './utils/constants';

describe('delete a job', () => {
  it('delete a job', () => {
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

    cy.visit(`${constants.baseUrl}/job/list`);

    const positionTitle = 'positionTitle';
    const location = 'location';
    const companyName = 'companyName';
    const link = 'https://www.google.no/';
    const dateApplied = '1990-01-01';
    const status = 'Rejected';
    const filename = 'example.txt';

    const repDateApplied = '01.01.1990';

    cy.get('.button').click();
    cy.get(':nth-child(1) > div > .field').type(positionTitle);
    cy.get(':nth-child(2) > div > .field').type(location);
    cy.get(':nth-child(3) > div > .field').type(companyName);
    cy.get(':nth-child(4) > div > .field').type(link);
    cy.get(':nth-child(5) > div > .field').type(dateApplied);
    cy.get(':nth-child(6) > .px-4').select(status);
    cy.get(':nth-child(7) > div > input').attachFile(filename);

    cy.get('.button').click();

    cy.get('.text-2xl > a').click();
    cy.get('.container').contains(positionTitle);
    cy.get('.container').contains(location);
    cy.get('.container').contains(companyName);
    cy.get('.container').contains(link);
    cy.get('.container').contains(repDateApplied);
    cy.get('.container').contains(status);
    cy.get('.container').contains(filename);

    cy.get(':nth-child(2) > .button').click();

    cy.get('.container').contains(positionTitle).should('not.exist');
    cy.get('.container').contains(location).should('not.exist');
    cy.get('.container').contains(companyName).should('not.exist');
    cy.get('.container').contains(link).should('not.exist');
    cy.get('.container').contains(repDateApplied).should('not.exist');
    cy.get('.container').contains(filename).should('not.exist');
  });
});
