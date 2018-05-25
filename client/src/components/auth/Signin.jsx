import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loginValidation from '../../utils/loginValidation';
import Errors from '../partials/ValidationErrors.jsx';

/**
 * Login class declaration
 *
 * @class Login
 *
 * @extends {React.Component}
 */
class Login extends Component {
  state = {
    loginData: {
      email: '',
      password: ''
    },
    errors: []
  };

  /**
  * Handle Login input change
  *
  * @param {event} event
  *
  * @return {event} event
  *
  */
  onInputChange = (event) => {
    const { loginData } = this.state;
    loginData[event.target.name] = event.target.value;
    this.setState(() => ({ loginData }));
  };

  /**
  * Handle submit
  *
  * @param {event} event
  *
  * @return {event} event
  *
  */
  onSubmit = async (event) => {
    event.preventDefault();
    const validation = loginValidation(this.state.loginData);
    if (validation.isValid()) {
      const { loginData } = this.state;
      try {
        const { data } = await axios.post('http://localhost:8000/api/v1/auth/login', loginData);
        console.log('>>>>>', data);
      } catch (e) {
        console.log(e);
      }
    } else {
      this.setState(state => ({ errors: validation.getErrors() }));
      const { errors } = validation;
    }
  };

  /**
    * Renders Login component
    *
    * @returns {XML} XML/JSX
*/
  render() {
    return (
      <div className='container'>

        <div className='wrapper'>
          <div className='login'>
            <div className='login-form'>
              <h3>User Login</h3>
              <form onSubmit={this.onSubmit}>
              {this.state.errors && <Errors errors={this.state.errors}>Errors</Errors>}
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  value={this.state.loginData.email}
                  onChange={this.onInputChange}
                /><br/>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={this.state.loginData.password}
                  onChange={this.onInputChange}
                /><br/>
                <button className='button warning'>Login</button>
                <p>Forgot <a href='#'>Password?</a></p>
              </form>
            </div>

          </div>

        </div>

    </div>
    );
  }
}

export default Login;
