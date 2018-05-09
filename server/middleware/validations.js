
const validations = () => ({
  customerValidation: {
    email: 'required|email',
    password: 'required|min:6|confirmed',
    password_confirmation: 'required',
    firstName: 'required|min:3|string',
    lastName: 'required|min:3|string'
  },
  catererValidation: {
    email: 'required|email',
    password: 'required|min:6|confirmed',
    password_confirmation: 'required',
    businessName: 'required|string',
    ownerName: 'required|string|min:6',
    businessAddress: 'required'
  },
  signinRules: {
    email: 'required|email',
    password: 'required'
  }
});

export default validations;
