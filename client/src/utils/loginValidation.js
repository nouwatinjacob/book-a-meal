import Validator from 'validatorjs';

const rules = {
  email: 'required|email',
  password: 'required'
};

const loginValidation = (data) => {
  const validation = new Validator(data, rules);
  const obj = { isValid: () => validation.passes() };
  if (validation.fails()) {
    obj.errors = validation.errors.all();
  }
  return Object.freeze(obj);
};

export default loginValidation;
