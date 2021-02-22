/// <reference types="Cypress" />

import constants from './constants';
import createRandomString from './createRandomString';

export enum JobStatus {
  'Applied',
  'Interviewing',
  'Under review',
  'Offer received',
  'Rejected',
}

interface IJob {
  positionTitle: string,
  location: string,
  companyName: string,
  link: string,
  dateApplied: string,
  status: string
}

export default (jobStatus: JobStatus): IJob => {
  cy.visit(`${constants.baseUrl}/job/list`);

  const positionTitle = createRandomString(12);
  const location = createRandomString(12);
  const companyName = createRandomString(12);
  const link = 'https://www.google.no/';
  const dateApplied = '1990-01-01';
  const status = JobStatus[jobStatus];
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

  return {
    positionTitle,
    location,
    companyName,
    link,
    dateApplied,
    status,
  }
}