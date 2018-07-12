import Validator from 'validatorjs';

const rules = {
  menuDate: 'required',
  mealId: 'required'
};

const menuValidation = (data) => {
  const validation = new Validator(data, rules);
  const obj = { isValid: () => validation.passes() };
  if (validation.fails()) {
    obj.errors = validation.errors.all();
  }
  return Object.freeze(obj);
};

export default menuValidation;
