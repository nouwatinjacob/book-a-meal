import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import signupAction from '../../actions/signupAction';
import catererValidation from '../../utils/catererValidation';

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
   event.preventDefault();
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
     const { catererData } = this.state;

     this.props.signupAction(catererData).then(() => {
       if (this.props.errorResponse) {
         const message = this.props.errorResponse.message;
         const notify = () => toast.info(message);
         notify();
       }
     });
   } else {
     this.setState(state => ({ errors: validation.getErrors() }));
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
              <h3>Caterer Registration</h3>
              <form onSubmit={this.onFormSubmit}>
                  <input
                    type='text'
                    name='businessName'
                    placeholder='Business Name'
                    value={this.state.catererData.businessName}
                    onChange={this.onInputChange}
                  /><br/>
                  {
                    this.state.errors.businessName ?
                    <span>The Business Name field is required.</span>
                    : ''
                  }
                  <input
                    type='text'
                    name='ownerName'
                    placeholder="Owner's Name"
                    value={this.state.catererData.ownerName}
                    onChange={this.onInputChange}
                  /><br/>
                  {
                    this.state.errors.ownerName ?
                    <span>The Owner Name field is required.</span>
                    : ''
                  }
                  <input
                    type='text'
                    name='businessAddress'
                    placeholder='Business Address'
                    value={this.state.catererData.businessAddress}
                    onChange={this.onInputChange}
                  /><br/>
                  {
                    this.state.errors.businessAddress ?
                    <span>The Business Address field is required.</span>
                    : ''
                  }
                  <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={this.state.catererData.email}
                    onChange={this.onInputChange}
                  /><br/>
                  {
                    this.state.errors.email ?
                    <span>{this.state.errors.email[0]}</span>
                    : ''
                  }
                  <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={this.state.catererData.password}
                    onChange={this.onInputChange}
                  /><br/>
                  {
                    this.state.errors.password ?
                    <span>{this.state.errors.password[0]}</span>
                    : ''
                  }
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

CatererSignup.propTypes = {
  signupAction: PropTypes.func.isRequired,
  signupState: PropTypes.object.isRequired,
  errorResponse: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  signupState: state.signupReducer,
  errorResponse: state.signupReducer.errors,
  isLoading: state.signupReducer.loading
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ signupAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatererSignup);