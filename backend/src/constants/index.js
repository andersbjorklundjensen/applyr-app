/**
 * Constants for authentication
 */

// Maximum length for a username, 50.
const USERNAME_MAX_LENGTH = 50;

// Minimum length for a password, 8.
const PASSWORD_MIN_LENGTH = 8;

// Maximum length for a password, 50.
const PASSWORD_MAX_LENGTH = 50;

/** 
 * Constants for job 
 */

// Maximum length of a position title, 50.
const POSITION_TITLE_MAX_LENGTH = 50;

// Maximum length for a location description, 50.
const LOCATION_MAX_LENGTH = 50;

// Maximum length for a link, 250.
const LINK_MAX_LENGTH = 250;

// Maximum length for a company name, 50.
const COMPANY_MAX_LENGTH = 50;


// Valid current statuses that a job can be in:
const jobStatuses = ['', 'Applied', 'Interviewing', 'Under review', 'Offer received', 'Rejected'];

// Maximum length for the notes section, 5000.
const NOTES_MAX_LENGTH = 5000;

/** 
 * Constants for files 
 */

/**
 * Allowed file extensions for uploaded documents:
 * - PDF
 * - TXT
 * - DOC
 * - DOCX
 */
const ALLOWED_EXTENSIONS = '.pdf, .txt, .doc, .docx';

// Maximum size allowed for a uploaded file, 10 MB.
const MAX_FILE_SIZE_IN_BYTES = 1024 * 1024 * 10;

module.exports = {
  jobStatuses
}