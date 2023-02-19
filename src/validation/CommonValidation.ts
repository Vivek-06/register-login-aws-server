import joi from 'joi';

const OBJECTID_REGEX = /^[a-f\d]{24}$/i;
const commonValidation = {
  stringRequired: joi.string().required(),
  stringOptional: joi.string().allow('', null).empty('').optional(),
  numberRequired: joi.number().required(),
  numberOptional: joi.number().allow(null).optional(),
  booleanRequired: joi.boolean().required(),
  booleanOptional: joi.boolean().optional(),
  arrayRequired: joi.array().required(),
  arrayOptional: joi.array().optional(),
  minRequired: (value: number) => joi.number().min(value).required(),
  minOptional: (value: number) => joi.number().min(value).optional(),
  emailRequired: joi.string().email({ minDomainSegments: 2 }).required(),
  emailOptional: joi.string().email({ minDomainSegments: 2 }).optional(),
  fileOptional: joi
    .array()
    .items(
      joi.object().keys({
        key: joi.string().required(),
        location: joi.string().uri().required()
      })
    )
    .optional(),
  fileRequired: joi
    .array()
    .items(
      joi.object().keys({
        key: joi.string().required(),
        location: joi.string().uri().required()
      })
    )
    .required(),
  objectIdRequired: joi.string().regex(OBJECTID_REGEX).required(),
  objectIdOptional: joi.string().regex(OBJECTID_REGEX).allow(null).optional()
};

export default commonValidation;
