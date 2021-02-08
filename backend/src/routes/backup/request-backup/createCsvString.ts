const moment = require('moment');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const constants = require('../../../constants');

function appendCsvOverviewFileToArchive(allJobs, archive) {
  const formattedJobs = formatJobs(allJobs);
  const csvString = getCsvString(csvHeaders, formattedJobs);

  archive.append(csvString, {
    name: 'data.csv',
  });
}

module.exports = {
  appendCsvOverviewFileToArchive,
};

const csvHeaders = [
  { id: 'positionTitle', title: 'POSITION_TITLE' },
  { id: 'location', title: 'LOCATION' },
  { id: 'linkToPosting', title: 'LINK_TO_POSTING' },
  { id: 'company', title: 'COMPANY' },
  { id: 'dateApplied', title: 'DATE_APPLIED' },
  { id: 'currentStatus', title: 'CURRENT_STATUS' },
];

function formatJobs(allJobs) {
  return allJobs.map((job) => {
    delete job.notes;

    return {
      ...job,
      dateApplied: moment(job.dateApplied).format('DD.MM.YYYY'),
      currentStatus: constants.jobStatuses[job.currentStatus],
    };
  });
}

function getCsvString(headers, records) {
  const csvStringifier = createCsvStringifier({
    header: headers,
  });

  return (
    csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records)
  );
}
