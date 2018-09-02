import Validator from 'validatorjs';

const rules = {
  menuDate: 'required',
  mealId: 'required'
};

const menuValidation = (data) => {
  const validation = new Validator(data, rules);
  const validationObj = { isValid: () => validation.passes() };
  if (validation.fails()) {
    validationObj.errors = validation.errors.all();
  }
  return Object.freeze(validationObj);
};

export default menuValidation;
