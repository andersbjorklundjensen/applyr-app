import moment from 'moment';
import { createObjectCsvStringifier as createCsvStringifier } from 'csv-writer';
import { jobStatuses } from '../../../constants';

export function appendCsvOverviewFileToArchive(allJobs: any, archive: any) {
  const formattedJobs = formatJobs(allJobs);
  const csvString = getCsvString(csvHeaders, formattedJobs);

  archive.append(csvString, {
    name: 'data.csv',
  });
}

const csvHeaders = [
  { id: 'positionTitle', title: 'POSITION_TITLE' },
  { id: 'location', title: 'LOCATION' },
  { id: 'linkToPosting', title: 'LINK_TO_POSTING' },
  { id: 'company', title: 'COMPANY' },
  { id: 'dateApplied', title: 'DATE_APPLIED' },
  { id: 'currentStatus', title: 'CURRENT_STATUS' },
];

function formatJobs(allJobs: any) {
  return allJobs.map((job: any) => {
    delete job.notes;

    return {
      ...job,
      dateApplied: moment(job.dateApplied).format('DD.MM.YYYY'),
      currentStatus: jobStatuses[job.currentStatus],
    };
  });
}

function getCsvString(headers: any, records: any) {
  const csvStringifier = createCsvStringifier({
    header: headers,
  });

  return (
    csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records)
  );
}
