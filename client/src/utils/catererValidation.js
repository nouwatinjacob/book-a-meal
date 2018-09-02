import Validator from 'validatorjs';

const rules = {
  businessName: 'required|string|max:30',
  ownerName: 'required|string|min:6|max:20',
  businessAddress: 'required|max:30',
  email: 'required|email',
  password: 'required|min:6|confirmed',
  password_confirmation: 'required'
};

const catererValidation = (data) => {
  const validation = new Validator(data, rules);
  const validationObj = { isValid: () => validation.passes() };
  if (validation.fails()) {
    validationObj.getErrors = () => validation.errors.all();
  }
  return Object.freeze(validationObj);
};

export default catererValidation;
