import React from 'react';
import axios from 'axios';
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
      password_confirmation: '',
      userType: 'caterer'
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
 onFormSubmit = async (event) => {
   event.preventDefault();
   const validation = catererValidation(this.state.catererData);
   if (validation.isValid()) {
     const { catererData } = this.state;
     try {
       const { data } = await axios.post('http://localhost:8000/api/v1/auth/signup', catererData);
     } catch (error) {
       return error;
     }
   } else {
     this.setState(state => ({ errors: validation.getErrors() }));
     const { errors } = validation;
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
                    value={this.state.catererData.businessName}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='text'
                    name='ownerName'
                    placeholder="Owner's Name"
                    value={this.state.catererData.ownerName}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='text'
                    name='businessAddress'
                    placeholder='Business Address'
                    value={this.state.catererData.businessAddress}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={this.state.catererData.email}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={this.state.catererData.password}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='password'
                    name='password_confirmation'
                    placeholder='Confirm Password'
                    value={this.state.catererData.password_confirmation}
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
