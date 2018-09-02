import Validator from 'validatorjs';

const rules = {
  name: 'required|min:3|max:80',
  price: 'required|numeric',
  image: 'required'
};

const mealValidation = (data) => {
  const validation = new Validator(data, rules);
  const validationObj = { isValid: () => validation.passes() };
  if (validation.fails()) {
    validationObj.errors = validation.errors.all();
  }
  return Object.freeze(validationObj);
};

export default mealValidation;
