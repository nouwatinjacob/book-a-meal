import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import swal from 'sweetalert';
import { getAMealAction, editMealAction } from '../../actions/mealAction';
import CatererHeader from '../partials/CatererHeader.jsx';

/**
 * EditMeal class declaration
 *
 * @class EditMeal
 *
 * @extends {React.Component}
 */
class EditMeal extends React.Component {
  state = {
    mealData: {
      name: '',
      price: '',
      image: ''
    },
    meal: [],
    errors: []
  }

  /**
   *
   * @param  {object} nextProps
   * 
   * @param  {object} prevState
   * 
   * @returns {XML} XML/JSX
   * 
   * @memberof EditMeal
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {};
    if (nextProps.mealState.success) {      
      nextState.meal = nextProps.mealState.meal;
    }
    return nextState;
  }

  /**
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof EditMeal
   */
  componentDidMount() {
    const mealId = this.props.match.params.mealId;
    this.props.getAMealAction(mealId);
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
   const { name, price, image } = this.state.mealData;
   const mealId = this.props.match.params.mealId;
   const formData = new FormData();

   formData.append('name', name);
   formData.append('price', price);
   formData.append('image', image);
   this.props.editMealAction(formData, mealId);
   swal("Meal Modified!", "Your Update is successful!", "success");
 }

 
  /**
   * Renders EditMeal component
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
                <h3>Edit Meal Details</h3>
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
                    placeholder={this.state.meal.name}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='text'
                    name='price'
                    placeholder={this.state.meal.price}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='file'
                    name='image'
                    placeholder='Meal Image'
                    onChange={this.onInputChange}
                  /><br/>
                  <button className='button warning'>Modify Meal</button>
                </form>
              </div>

            </div>

          </div>
      </div>
   );
 }
}


EditMeal.propTypes = {
  getAMealAction: PropTypes.func.isRequired,
  editMealAction: PropTypes.func.isRequired,
  mealState: PropTypes.object.isRequired,
  match: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  mealState: state.mealReducer,
  isLoading: state.mealReducer.loading
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAMealAction, editMealAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditMeal);
