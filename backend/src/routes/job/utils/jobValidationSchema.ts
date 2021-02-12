const Joi = require('joi');

export default Joi.object({
  positionTitle: Joi
    .string()
    .min(3)
    .max(50)
    .required(),

  location: Joi
    .string()
    .required()
    .max(50),

  linkToPosting: Joi
    .string()
    .uri()
    .required()
    .max(250),

  company: Joi
    .string()
    .required()
    .max(50),

  dateApplied: Joi
    .number()
    .required(),

  currentStatus: Joi
    .number()
    .required()
    .allow(1, 2, 3, 4, 5),

  notes: Joi
    .string()
    .allow("")
    .max(5000),
  
  id: Joi
  .any(),

  files: Joi
  .any()
})

/**
 * Valid current statuses that a job can be in:
 * - 1 = applied
 * - 2 = interviewing
 * - 3 = under review
 * - 4 = offer received
 * - 5 = rejected
 */
