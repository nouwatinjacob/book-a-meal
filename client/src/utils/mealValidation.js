import Validator from 'validatorjs';

const rules = {
  name: 'required|min:3|max:80',
  price: 'required|numeric',
  image: 'required'
};

const mealValidation = (data) => {
  const validation = new Validator(data, rules);
  const obj = { isValid: () => validation.passes() };
  if (validation.fails()) {
    obj.errors = validation.errors.all();
  }
  return Object.freeze(obj);
};

export default mealValidation;
