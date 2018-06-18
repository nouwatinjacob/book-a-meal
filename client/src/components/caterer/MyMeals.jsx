import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMeals, deleteMealAction } from '../../actions/mealAction';
import CatererHeader from '../partials/CatererHeader.jsx';
import Search from '../partials/Search.jsx';
import Pagination from '../partials/Pagination.jsx';
import Meals from './Meals.jsx';

/**
 * MyMeals class declaration
 *
 * @class MyMeals
 *
 * @extends {React.Component}
 */
class MyMeals extends React.Component {
  state = {
    errors: [],
    meals: [],
    loading: true
  }
       

  /**
   *
   * @param  {object} nextProps
   * 
   * @param  {object} prevState
   * 
   * @returns {XML} XML/JSX
   * 
   * @memberof MyMeals
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {};
    if (nextProps.mealState.success) {      
      nextState.meals = nextProps.mealState.meals;
      nextState.loading = false;
    }
    return nextState;
  }

  /**
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof MyMeals
   */
  componentDidMount() {    
    this.props.getMeals();        
  }

  notify = () => {
    toast("Meal Deleted Successfully");
  };

  /**
   * Handles meal deletion
   * 
   * @method handleDelete
   * 
   * @param { object } mealId
   * 
   * @return {void}
  */
  handleDelete = (mealId) => {
    this.props.deleteMealAction(mealId);
    window.location.reload(); 
    this.notify();
  }
  
  /**
   * Renders MyMeals component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const { meals, loading } = this.state;
    return (
      <div>     
    {
      loading ? <div className='container loading'>
      <ToastContainer />
      <Loader 
         type="Rings"
         color="#ff9600"
         height="100"
         width="100"
      />
      <h3>Loading...</h3>  
      </div> : 
      <div className='container'>
      <ToastContainer />
        <CatererHeader/>
        <div className='wrapper'>        
          <Search/>
              <table>
                <tbody>
                <tr>
                  <th>Meal Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
                { meals.map(meal =>
                <Meals
                  key={meal.id}
                  meals={meal}
                  deleteAction={this.handleDelete}
                />)}
                </tbody>
              </table>
          </div><br/>
        <Pagination/><br/>
      </div>
    }
    </div>
    );
  }
}

MyMeals.propTypes = {
  deleteMealAction: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
  mealState: PropTypes.object.isRequired,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  mealState: state.mealReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getMeals, deleteMealAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyMeals);