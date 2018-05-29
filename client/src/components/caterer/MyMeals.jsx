import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import getMeals from '../../actions/mealAction';
import CatererHeader from '../partials/CatererHeader.jsx';
import photo from '../../assets/img/fried-rice.jpg';
import Search from '../partials/Search.jsx';
import Pagination from '../partials/Pagination.jsx';

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
   * @memberof RecipeDetail
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
   * @memberof RecipeDetail
   */
  componentDidMount() {
    this.props.getMeals();
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
      <Loader 
         type="Rings"
         color="#ff9600"
         height="100"
         width="100"
      />
      <h3>Loading...</h3>  
      </div> : 
      <div className='container'>
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
                  <tr key={meal.id}>
                    <td>{meal.name}</td>
                    <td><img src={photo} width='60' height='50' /></td>
                    <td>{meal.price}</td>
                    <td>
                    <button className='button warning' style={{ marginRight: '5px' }}>
                     <Link to='/edit-meal/1'> Modify </Link>
                    </button>
                    <button className='button danger'>Delete</button>
                  </td>
                  </tr>)}
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
  getMeals: PropTypes.func.isRequired,
  mealState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  mealState: state.mealReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getMeals }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyMeals);