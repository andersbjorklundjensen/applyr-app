/// <reference types="Cypress" />

import createRandomString from './utils/createRandomString';
import createAJob, { JobStatus } from './utils/createAJob';

describe('add a new job', () => {
  it('adding new job with a file', () => {
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

    const job1 = createAJob(JobStatus.Applied);
    const job2 = createAJob(JobStatus.Interviewing);
    const job3 = createAJob(JobStatus.Rejected);

    cy.get('.-mx-2 > :nth-child(1)').type(job1.positionTitle)
    cy.get('.container').contains(job1.positionTitle);
    cy.get('.container').contains(job2.positionTitle).should('not.exist');
    cy.get('.container').contains(job3.positionTitle).should('not.exist');

    cy.get('.-mx-2 > :nth-child(1) > input').clear();

    cy.get('.selector').select('Applied');
    cy.get('.container').contains(job1.positionTitle);
    cy.get('.container').contains(job2.positionTitle).should('not.exist');
    cy.get('.container').contains(job3.positionTitle).should('not.exist');
  });
});
