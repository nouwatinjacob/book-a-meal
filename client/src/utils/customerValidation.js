import Validator from 'validatorjs';

const rules = {
  firstName: 'required|min:3|string|max:20',
  lastName: 'required|min:3|string|max:20',
  email: 'required|email',
  password: 'required|min:6|confirmed',
  password_confirmation: 'required'
};

const customerValidation = (data) => {
  const validation = new Validator(data, rules);
  const obj = { isValid: () => validation.passes() };
  if (validation.fails()) {
    obj.getErrors = () => validation.errors.all();
  }
  return Object.freeze(obj);
};

export default customerValidation;
