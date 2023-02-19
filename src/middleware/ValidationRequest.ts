import { validate } from 'express-validation';

const validateRequset = (schema: any) => {
  return validate(schema, {}, { allowUnknown: true });
};

export default validateRequset;
