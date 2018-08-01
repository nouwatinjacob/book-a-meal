import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import history from '../../utils/history';
import { getMenuAction } from '../../actions/menuAction';
import CustomerHeader from '../partials/CustomerHeader.jsx';
import CatererHeader from '../partials/CatererHeader.jsx';
import { decodeToken } from '../../utils/helper';

/**
 * MenuMeal class declaration
 *
 * @class MenuMeal
 *
 * @extends {React.Component}
 */
class MenuMeal extends React.Component {
  state= {
    errors: [],
    loading: false,
  }

  /**
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof MenuMeal
   */
  componentDidMount() {
    const todayDate = new Date().toISOString().slice(0, 10);
    this.props.getMenuAction('2018-06-15');
  }

  /**
   * Handles makeOrder button
   * 
   * @method onClickOrder
   * 
   * @param { event } event
   * 
   * @return {void}
  */
  handleDateChange = (event) => {
    const searchDate = event.target.value;
    this.props.getMenuAction(searchDate);
  }

  /**
   * Handles makeOrder button
   * 
   * @method onClickOrder
   * 
   * @param { object } mealId
   * 
   * @param { object } menuId
   * 
   * @param { event } event
   * 
   * @return {void}
  */
  onClickOrder = (mealId, menuId, event) => {
    const idsArray = [];
    idsArray.push(mealId, menuId);
    sessionStorage.setItem('ids', JSON.stringify(idsArray));
    history.push('/confirm-order');
  }

  /**
   * Renders MenuMeal component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const { menuState: { menus: { dateMenu } } } = this.props;
    const token = localStorage.getItem('token');
    const userToken = decodeToken(token);
    return (
      <div>
        <div className='container'>
        { 
          userToken.userType === 'customer' ? 
          <CustomerHeader/> : <CatererHeader/>
        }
          
          <div className='wrapper'>
            <div className='wrapper search'>
              <label>Search by date</label>
              <input
                type='date'
                onChange={this.handleDateChange}
              />
            </div>
            
              <div className='row'>
              { dateMenu.length > 0 ?
                dateMenu[0].Meals.map((meal, index) => 
              <div className='c-medium-3 c-xsmall-12 c-3' id='pd-0' key={index}>
              <div className='box'>
                <div id='menu-image'>
                  <img 
                    src={meal.image} 
                    alt='Avatar'
                  />
                </div>
                <div className='box-body'>
                  <div className='row'>
                    <div
                      className='c-medium-12 c-xsmall-12 text-center' 
                      id='pd-0'
                    >
                      <p><b>{meal.name}</b></p>
                      <p>Price {meal.price}</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div
                      className='c-medium-12 c-xsmall-12 text-center' 
                      id='pd-0'
                    >
                      <button 
                        className='button warning'
                        onClick={
                          event => 
                          this.onClickOrder(meal.id, dateMenu[0].id, event)
                        }
                      >Order Meal 
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>) : 
              <div className='wrapper'>
                <h6
                  className='text-center mt-10'>No Menu to display for this date
                </h6>
              </div> }
              </div>
            <br/>

          </div>
        </div><br/>
      </div>
    );
  }
}

MenuMeal.propTypes = {
  getMenuAction: PropTypes.func.isRequired,
  menuState: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  menuState: state.menuReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getMenuAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuMeal);
