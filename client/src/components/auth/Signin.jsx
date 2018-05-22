import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header.jsx';

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
    error: undefined
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
    const { email, password } = this.state.loginData;
    const loginData = { email, password };
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
  onSubmit = (event) => {
    event.preventDefault();
    if (!this.state.loginData.email || !this.state.loginData.password) {
      this.setState(() => ({ error: 'Please provide email and password.' }));
    } else {
      this.setState(() => ({ error: '' }));
      console.log(this.state.loginData);
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
        <Header/>

        <div className='wrapper'>
          <div className='login'>
            <div className='login-form'>
              <h3>User Login</h3>
              <form onSubmit={this.onSubmit}>
              {this.state.error && <p className="form-error">{this.state.error}</p>}
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
