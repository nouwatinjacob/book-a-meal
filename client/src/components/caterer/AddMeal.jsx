import React from 'react';
import PropTypes from 'react-proptypes';
import Loader from 'react-loader-spinner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addMeal } from '../../actions/mealAction';
import CatererHeader from '../partials/CatererHeader.jsx';
import mealValidation from '../../utils/mealValidation';
import Errors from '../partials/ValidationErrors.jsx';

/**
 * AddMeal class declaration
 *
 * @class AddMeal
 *
 * @extends {React.Component}
 */
class AddMeal extends React.Component {
  state = {
    mealData: {
      name: '',
      price: '',
      image: ''
    },
    loading: false,
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
   const mealData = this.state.mealData;
   switch (event.target.name) {
     case 'image':
       mealData.image = event.target.files[0];
       break;
     default:
       mealData[event.target.name] = event.target.value;
   }
   this.setState(mealData);
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
   const validation = mealValidation(this.state.mealData);
   if (validation.isValid()) {
     const { name, price, image } = this.state.mealData;
     const formData = new FormData();

     formData.append('name', name);
     formData.append('price', price);
     formData.append('image', image);
     
     this.props.addMeal(formData).then(() => {
       if (this.props.mealState.success) {
         swal("Meal Added Successfully!", "success");
       } else if (!this.props.mealState.success && this.props.mealState.error) {
         const message = this.props.mealState.error.message;
         swal(message);
       }
     });
   } else {
     this.setState(state => ({ errors: validation.errors }));
   }
 }

  /**
   * Renders Login component
   *
   * @returns {XML} XML/JSX
   */
 render() {
   return (
      <div className='container'>
        <CatererHeader/>
          <div className='wrapper'>
            <div className='login'>
              <div className='login-form'>
                <h3>Add New Meal</h3>
                { 
                  this.props.isLoading ? 
                  <Loader 
                    type="Rings"
                    color="#ff9600"
                    height="50"
                    width="100"
                    margin="2px"
                  />
                  :
                  ''
                }
                <form
                  encType='multipart/form-data'
                  onSubmit={this.onFormSubmit}
                >
                  <input
                    type='text'
                    name='name'
                    placeholder='Meal Name'
                    onChange={this.onInputChange}
                  /><br/>
                  { 
                    this.state.errors.name ?
                    <span>{this.state.errors.name[0]}</span>
                    : ''
                  }
                  <input
                    type='text'
                    name='price'
                    placeholder='Meal Price'
                    onChange={this.onInputChange}
                  /><br/>
                  { 
                    this.state.errors.price ?
                    <span>{this.state.errors.price[0]}</span>
                    : ''
                  }
                  <input
                    type='file'
                    name='image'
                    accept='image/*'
                    placeholder='Meal Image'
                    onChange={this.onInputChange}
                  /><br/>
                  { 
                    this.state.errors.image ?
                    <span>{this.state.errors.image[0]}</span>
                    : ''
                  }<br/>
                  <button className='button warning'>Add Meal</button>
                </form>
              </div>

            </div>

          </div>
      </div>
   );
 }
}

AddMeal.propTypes = {
  addMeal: PropTypes.func.isRequired,
  mealState: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  mealState: state.mealReducer,
  isLoading: state.mealReducer.loading
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ addMeal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddMeal);
