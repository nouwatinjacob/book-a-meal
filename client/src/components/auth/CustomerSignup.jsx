import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import signupAction from '../../actions/signupAction';
import customerValidation from '../../utils/customerValidation';

/**
 * CustomerSignup class declaration
 *
 * @class CustomerSignup
 *
 * @extends {React.Component}
 */
export class CustomerSignup extends Component {
  state = {
    customerData: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password_confirmation: '',
      userType: 'customer'
    },
    errors: [],
    fail: null
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
      const { customerData } = this.state;

      this.props.signupAction(customerData).then(() => {
        if (this.props.errorResponse) {
          const message = this.props.errorResponse.message;
          const notify = () => toast.info(message);
          notify();
        }
      });
    } else {
      /* istanbul ignore next */
      this.setState(state => ({ errors: validation.getErrors() }));
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
              <h3>User Registration</h3>
              <form onSubmit={this.onFormSubmit}>
                  <input
                    type='text'
                    name='firstName'
                    placeholder='First Name'
                    value={this.state.customerData.firstName}
                    onChange={this.onInputChange}
                  /><br/>
                  {
                    /* istanbul ignore next */
                    this.state.errors.firstName ?
                    <span>The First Name field is required.</span>
                    : ''
                  }
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Last Name'
                    value={this.state.customerData.lastName}
                    onChange={this.onInputChange}
                  /><br/>
                  {
                    /* istanbul ignore next */
                    this.state.errors.lastName ?
                    <span>The Last Name field is required.</span>
                    : ''
                  }
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={this.state.customerData.email}
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
                    value={this.state.customerData.password}
                    onChange={this.onInputChange}
                  /><br/>
                  {
                    /* istanbul ignore next */
                    this.state.errors.password ?
                    <span>{this.state.errors.password[0]}</span>
                    : ''
                  }
                  <input
                    type='password'
                    name='password_confirmation'
                    placeholder='Confirm Password'
                    value={this.state.customerData.password_confirmation}
                    onChange={this.onInputChange}
                  /><br/>
                <button className='button warning'>Signup</button>
                <p>
                  Do you want to be part of our Caterers? &nbsp;
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

CustomerSignup.propTypes = {
  signupAction: PropTypes.func.isRequired,
  signupState: PropTypes.object.isRequired,
  errorResponse: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
};

export const mapStateToProps = state => ({
  signupState: state.signupReducer,
  errorResponse: state.signupReducer.errors,
  isLoading: state.signupReducer.loading
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ signupAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSignup);