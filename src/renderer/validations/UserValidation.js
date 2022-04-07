import * as yup from 'yup';

let name = yup.string.required();
let forename = yup.string.required();

const validateFielsString = async (test, required = null) => {
  let str = required ? yup.string.required() : yup.string;
  if (await str.isValid(test)) {
    return true;
  }
  return false;
};

module.exports = {
  validateFiels,
};
