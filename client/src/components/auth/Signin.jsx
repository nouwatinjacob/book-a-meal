import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAction } from '../../actions/loginAction';
import loginValidation from '../../utils/loginValidation';

/**
 * Login class declaration
 *
 * @class Login
 *
 * @extends {React.Component}
 */
export class Login extends Component {
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
  onSubmit = (event) => {
    event.preventDefault();
    const validation = loginValidation(this.state.loginData);
    if (validation.isValid()) {
      const { loginData } = this.state;
      this.props.loginAction(loginData);
    } else {
      /* istanbul ignore next */
      this.setState(state => ({ errors: validation.getErrors() }));
    }
  };

 loginSuccess = () => toast.success('Invalid Credentials');

  /**
    * Renders Login component
    *
    * @returns {XML} XML/JSX
*/
 render() {
   return (
      <div className='container'>
        <ToastContainer />
        <div className='wrapper'>
          <div className='login'>
            <div className='login-form'>
            {
              this.props.isLoading ?
                <Loader
                  type='Rings'
                  color='#ff9600'
                  height='50'
                  width='100'
                  margin='2px'
                />
                : ''
            }
              <h3>User Login</h3>
              <form onSubmit={this.onSubmit}>
                <input
                  type='text'
                  name='email'
                  placeholder='Email'
                  value={this.state.loginData.email}
                  onChange={this.onInputChange}
                /><br/>
                {
                  /* istanbul ignore next */
                  this.state.errors.email ?
                  <span>{this.state.errors.email[0]}</span>
                  : ''
                }

                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={this.state.loginData.password}
                  onChange={this.onInputChange}
                /><br/>
                {
                  /* istanbul ignore next */
                  this.state.errors.password ?
                  <span>{this.state.errors.password[0]}</span>
                  : ''
                }
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

Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export const mapStateToProps = state => ({
  state: state.loginReducer,
  isLoading: state.loginReducer.loading
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);