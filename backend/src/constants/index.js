/** @module Constants/user */

/**
 * Maximum length for a username, 50.
 * @memberof module:Constants/user
 * @type {string}
 */
const USERNAME_MAX_LENGTH = 50;

/**
 * Minimum length for a password, 8.
 * @memberof module:Constants/user
 * @type {string}
 */
const PASSWORD_MIN_LENGTH = 8;

/**
 * Maximum length for a password, 50.
 * @memberof module:Constants/user
 * @type {string}
 */
const PASSWORD_MAX_LENGTH = 50;

/** @module Constants/job */

/**
 * Maximum length of a position title, 50.
 * @memberof module:Constants/job
 * @type {string}
 */
const POSITION_TITLE_MAX_LENGTH = 50;

/**
 * Maximum length for a location description, 50.
 * @memberof module:Constants/job
 * @type {string}
 */
const LOCATION_MAX_LENGTH = 50;

/** 
 * Maximum length for a link, 250.
 * @memberof module:Constants/job
 * @type {string}
 */
const LINK_MAX_LENGTH = 250;

/**
 * Maximum length for a company name, 50.
 * @memberof module:Constants/job
 * @type {string}
 */
const COMPANY_MAX_LENGTH = 50;

/**
 * Valid current statuses that a job can be in:
 * - 1 = applied
 * - 2 = interviewing
 * - 3 = under review
 * - 4 = offer received
 * - 5 = rejected
 * @memberof module:Constants/job
 * @type {number}
 */
const VALID_CURRENT_STATUS = new Set([1, 2, 3, 4, 5]);

/**
 * Maximum length for the notes section, 5000.
 * @memberof module:Constants/job
 * @type {number}
 */
const NOTES_MAX_LENGTH = 5000;

/** @module Constants/files */

/**
 * Allowed file extensions for uploaded documents:
 * - PDF
 * - TXT
 * - DOC
 * - DOCX
 * @constant
 * @memberof module:Constants/files
 * @type {string}
 */
const ALLOWED_EXTENSIONS = '.pdf, .txt, .doc, .docx';

/**
 * Maximum size allowed for a uploaded file, 10 MB.
 * @memberof module:Constants/files
 * @type {string}
 */
const MAX_FILE_SIZE_IN_BYTES = 1024 * 1024 * 10;

const jobStatuses = ['', 'Applied', 'Interviewing', 'Under review', 'Offer received', 'Rejected'];

module.exports = {
  VALID_CURRENT_STATUS,
  jobStatuses
}