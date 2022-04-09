import * as yup from 'yup';

let name = yup.string().required();
let forename = yup.string().required();

const schemaUser = yup.object().shape({
  name: yup.string().required(),
  forename: yup.string().required(),
  email: yup.string().email().required(),
  // password: yup.string().required(),
  city: yup.string().required(),
  country: yup.string().required(),
  // countryPhoneNumber: yup.string(),
  // role: yup.string(),
  // avatar: yup.string(),
  // zipCode: yup.string(),
  address: yup.string().required(),
  birthday: yup.string().required(),
  phoneNumber: yup.string().required(),
});

const validateFielsString = async (test, required = null) => {
  let str = required ? yup.string().required() : yup.string();
  if (await str.isValid(test)) {
    return true;
  }
  return false;
};

const validatePhone = async (test, required = null) => {
  let str = required
    ? yup.number().min(999999999).positive().integer().required()
    : yup.number().min(999999999).positive().integer();
  if (await str.isValid(test)) {
    return true;
  }
  return false;
};

const validateDate = async (test, required = null) => {
  if (validateFielsString(test, required)) {
    let format = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (format.test(test)) {
      return true;
    }
  }
  return false;
};

const validateEmail = async (test, required = null) => {
  let str = required ? yup.string().email().required() : yup.string().email();
  if (await str.isValid(test)) {
    return true;
  }
  return false;
};

const validateUsers = async (user) => {
  let error = {
    name: false,
    forename: false,
    address: false,
    city: false,
    country: false,
    email: false,
    birthday: false,
    phoneNumber: false,
  };

  if (
    !(await schemaUser.isValid({
      // password: req.body.password,
      name: user.name,
      forename: user.forename,
      email: user.email,
      city: user.city,
      country: user.country,
      // countryPhoneNumber: countryPhoneNumber,
      // role: role,
      // avatar: avatar,
      // zipCode: zipCode,
      address: user.address,
      birthday: user.birthday,
      phoneNumber: user.phoneNumber,
    }))
  ) {
    if (!(await validateEmail(user.email, true))) {
      error.email = user.email == '' ? 'champs requis' : 'email invalid';
    }
    if (!(await validateFielsString(user.name, true))) {
      error.name = 'champs requis';
    }
    if (!(await validateFielsString(user.forename, true))) {
      error.forename = 'champs requis';
    }
    if (!(await validateFielsString(user.city, true))) {
      error.city = 'champs requis';
    }
    if (!(await validateFielsString(user.country, true))) {
      error.country = 'champs requis';
    }
    if (!(await validateFielsString(user.address, true))) {
      error.address = 'champs requis';
    }
    if (!(await validateFielsString(user.birthday, true))) {
      error.birthday = 'champs requis';
    }
    if (!(await validatePhone(user.phoneNumber, true))) {
      error.phoneNumber = 'champs requis';
    }
  } else {
    /**si tout est bon on return false */
    return false;
  }

  return error;
};

export default {
  validateFielsString,
  validateEmail,
  validatePhone,
  validateUsers,
  validateDate,
};
