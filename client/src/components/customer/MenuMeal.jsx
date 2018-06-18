import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import history from '../../utils/history';
import { getMenuAction } from '../../actions/menuAction';
import CustomerHeader from '../partials/CustomerHeader.jsx';
import Search from '../partials/Search.jsx';
import Pagination from '../partials/Pagination.jsx';

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
    return (
      <div>
        <div className='container'>
          <CustomerHeader/>
          <div className='wrapper'>
            <Search/>
            
              <div className='row'>
              { (dateMenu) ?
                dateMenu[0].Meals.map((meal, index) => 
              <div className='c-medium-3 c-xsmall-12 c-3' id='pd-0' key={index}>
              <div className='box'>
                <img src={meal.image} alt='Avatar' style={{ width: '100%' }} />
                <div className='box-body'>
                  <div className='row'>
                    <div className='c-medium-12 c-xsmall-12 text-center' id='pd-0'>
                      <p><b>{meal.name}</b></p>
                      <p>Price {meal.price}</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='c-medium-12 c-xsmall-12 text-center' id='pd-0'>
                      <button 
                        className='button warning'
                        onClick={event => this.onClickOrder(meal.id, dateMenu[0].id, event)}
                      >Order Meal 
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>) : '' }
              </div>
            <br/>

          </div>
        </div><br/><hr/>

      <Pagination/><br/>
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
