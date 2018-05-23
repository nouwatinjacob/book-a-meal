import React from 'react';
import { Link } from 'react-router-dom';
import catererValidation from '../../utils/catererValidation';
import Errors from '../partials/ValidationErrors.jsx';

/**
 * CatererSignup class declaration
 *
 * @class CatererSignup
 *
 * @extends {React.Component}
 */
class CatererSignup extends React.Component {
  state = {
    catererData: {
      businessName: '',
      ownerName: '',
      businessAddress: '',
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
   const { catererData } = this.state;
   catererData[event.target.name] = event.target.value;
   this.setState({ catererData });
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
   const validation = catererValidation(this.state.catererData);
   if (validation.isValid()) {
     this.setState({ errors: [] });
     event.target.value = '';
     console.log(this.state.catererData);
   } else {
     this.setState(state => ({ errors: validation.errors }));
     const { errors } = validation;
     console.log('>>>>>>>>> ', errors);
   }
 }

  /**
   * Renders CatererSignup component
   *
   * @return {XML} JSX
   */
 render() {
   return (
      <div className='container'>
        <div className='wrapper'>
          <div className='login'>
            <div className='login-form'>
              <h3>Caterer Registration</h3>
              <form onSubmit={this.onFormSubmit}>
              {this.state.errors && <Errors errors={this.state.errors}>Errors</Errors>}
                  <input
                    type='text'
                    name='businessName'
                    placeholder='Business Name'
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='text'
                    name='ownerName'
                    placeholder="Owner's Name"
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='text'
                    name='businessAddress'
                    placeholder='Business Address'
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='password'
                    name='password_confirmation'
                    placeholder='Confirm Password'
                    onChange={this.onInputChange}
                  /><br/>
                <button className='button warning'>Signup</button>

            </form>
            </div>

          </div>

        </div>

      </div>
   );
 }
}

export default CatererSignup;
