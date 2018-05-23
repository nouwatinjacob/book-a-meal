import React from 'react';
import { Link } from 'react-router-dom';
import customerValidation from '../../utils/customerValidation';
import Errors from '../partials/ValidationErrors.jsx';

/**
 * CustomerSignup class declaration
 *
 * @class CustomerSignup
 *
 * @extends {React.Component}
 */
class CustomerSignup extends React.Component {
  state = {
    customerData: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    errors: []
  }

  /**
  * Handle onInputChange
  *
  * @param {event} event
  *
  * @return {event} event
  *
  */
  onInputChange = (event) => {
    const { customerData } = this.state;
    customerData[event.target.name] = event.target.value;
    this.setState({ customerData });
  }

  /**
  * Handle onFormSubmit
  *
  * @param {event} event
  *
  * @return {event} event
  *
  */
  onFormSubmit = (event) => {
    event.preventDefault();
    const validation = customerValidation(this.state.customerData);
    if (validation.isValid()) {
      this.setState({ errors: [] });
      console.log(this.state.customerData);
    } else {
      this.setState(state => ({ errors: validation.errors }));
      const { errors } = validation;
      console.log('>>>>>>>>> ', errors);
    }
  }
  /**
    * Renders CustomerSignup component
    *
    * @returns {XML} XML/JSX
*/
  render() {
    return (
      <div className='container'>
        <div className='wrapper'>
          <div className='login'>
            <div className='login-form'>
              <h3>User Registration</h3>
              <form onSubmit={this.onFormSubmit}>
              {this.state.errors && <Errors errors={this.state.errors}>Errors</Errors>}
                  <input
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    value={this.state.customerData.firstName}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    value={this.state.customerData.lastName}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={this.state.customerData.email}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={this.state.customerData.password}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='password'
                    name='password_confirmation'
                    placeholder='Confirm Password'
                    value={this.state.customerData.password_confirmation}
                    onChange={this.onInputChange}
                  /><br/>
                <button className='button warning'>Signup</button>
                <p>
                  Do you want to be part of our Caterers?
                  <Link to='/caterer-signup'>Signup  here</Link>
                </p>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerSignup;