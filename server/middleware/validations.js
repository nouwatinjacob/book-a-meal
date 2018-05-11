
const validations = () => ({
  customerValidation: {
    email: 'required|email',
    password: 'required|min:6|confirmed',
    password_confirmation: 'required',
    firstName: 'required|min:3|string|max:20',
    lastName: 'required|min:3|string|max:20'
  },
  catererValidation: {
    email: 'required|email',
    password: 'required|min:6|confirmed',
    password_confirmation: 'required',
    businessName: 'required|string|max:30',
    ownerName: 'required|string|min:6|max:20',
    businessAddress: 'required|max:30'
  },
  signinRules: {
    email: 'required|email',
    password: 'required'
  },
  orderRules: {
    mealId: 'required|integer',
    quantity: 'required|numeric'
  },
  menuRules: {
    menuDate: 'required'
  },
  mealRules: {
    name: 'required|min:3|max:20',
    price: 'required|numeric',
    image: 'required'
  }

});

export default validations;
