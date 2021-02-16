/// <reference types="Cypress" />

import createRandomString from './utils/createRandomString';

describe('edit a new job', () => {
  it('editing job with a file', () => {
    const username = createRandomString(8);
    cy.visit('http://localhost:3000/register');
    cy.get(':nth-child(1) > div > .field').type(username);
    cy.get(':nth-child(2) > div > .field').type(createRandomString(8));
    cy.get('.w-full').click();

    cy.url()
      .should('eq', 'http://localhost:3000/')
      .then(() =>
        expect(localStorage.getItem('job-app:auth'))
          .to.include('username')
          .to.include(username)
          .to.include('token'),
      );

    cy.visit('http://localhost:3000/job/list');

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

    
    const positionTitle2 = 'positionTitle2';
    const location2 = 'location2';
    const companyName2 = 'companyName2';
    const link2 = 'https://www.google.com/';
    const dateApplied2 = '1990-01-02';
    const status2 = 'Applied';
    const filename2 = 'example2.txt';
    
    const repDateApplied2 = '02.01.1990';
    
    cy.get(':nth-child(1) > .button').click();
    cy.get(':nth-child(1) > div > .field').clear().type(positionTitle2);
    cy.get(':nth-child(2) > div > .field').clear().type(location2);
    cy.get(':nth-child(3) > div > .field').clear().type(companyName2);
    cy.get(':nth-child(4) > div > .field').clear().type(link2);
    cy.get(':nth-child(5) > div > .field').clear().type(dateApplied2);
    cy.get(':nth-child(6) > .px-4').select(status2);
    cy.get(':nth-child(7) > .flex > :nth-child(2)').click();
    cy.get(':nth-child(7) > input').attachFile(filename2);
    
    cy.get('.button').click();

    cy.get('.text-3xl').contains(positionTitle2);
    cy.get('.container').contains(location2);
    cy.get('.container').contains(companyName2);
    cy.get('.container').contains(link2);
    cy.get('.container').contains(repDateApplied2);
    cy.get('.container').contains(status2);
    cy.get('.container').contains(filename2);
  });
});
