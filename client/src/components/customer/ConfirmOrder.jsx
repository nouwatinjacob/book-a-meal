import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import { getAMealAction } from '../../actions/mealAction';
import { makeOrderAction } from '../../actions/orderAction';
import CustomerHeader from '../partials/CustomerHeader.jsx';
import CatererHeader from '../partials/CatererHeader.jsx';
import history from '../../utils/history';
import { decodeToken } from '../../utils/helper';

/**
 * ConfirmOrder class declaration
 *
 * @class ConfirmOrder
 *
 * @extends {React.Component}
 */
class ConfirmOrder extends React.Component {
  state = {
    quantity: 1,
    price: null,
    meal: [],
    orderDetail: {
      mealId: null,
      quantity: null,
      menuId: null
    }
  }

  /**
   *
   * @param  {object} props
   * 
   * @param  {object} state
   * 
   * @returns {object} object
   * 
   * @memberof ConfirmOrder
   */
  static getDerivedStateFromProps(props, state) {
    if (props.mealState.success) {      
      state.meal = props.mealState.meal;
    }
    return state;
  }

  /**
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof ConfirmOrder
   */
  componentDidMount() {
    const data = JSON.parse(sessionStorage.getItem('ids'));
    if (!data) {
      history.push('/menus');
    } else {
      this.props.getAMealAction(data[0]);
    }
  }

  /**
   * Handles quantity change
   * 
   * @method handleDelete
   * 
   * @param {event} event
   * 
   * @return {void}
  */
  handleQuantityChange = (event) => {
    const data = JSON.parse(sessionStorage.getItem('ids'));
    const quantity = parseInt(event.target.value, 10);
    const { meal } = this.state;
    const price = quantity * meal.price;
    const mealId = this.state.meal.id;
    const menuId = parseInt(data[1], 10);
    this.setState(state => (
      { 
        quantity, price, orderDetail: { mealId, quantity, menuId } 
      }));
  }


  handleMakeOrder = () => {
    const { orderDetail } = this.state;
    this.props.makeOrderAction(orderDetail).then(() => {
      if (this.props.orderState.success) {
        swal("Meal Added Successfully!");
        history.push('/user-order');
      } else if (
        !this.props.orderState.success && this.props.orderState.error
      ) {
        const message = this.props.mealState.error.message;
        const notify = () => toast.info(message);
        notify();
      }
    });
    sessionStorage.clear();
  }

  /**
   * Renders ConfirmOrder component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const { mealState: { meal } } = this.props;
    const token = localStorage.getItem('token');
    const userToken = decodeToken(token);
    return (
      <div className='container'>
        { 
          userToken.userType === 'customer' ? 
          <CustomerHeader/> : <CatererHeader/>
        }
          <div className='wrapper'>
            <div className='reduced-container'>
              <div className='row'>
              <div className='c-medium-6 c-small-12 c-xsmall-12' id='pd-0'>
                <h3>CART</h3>
              </div>
              <div
                className='c-medium-6 c-small-12 c-xsmall-12 amount' 
                id='pd-0'
              >
                <button className='button default'>
                  <Link to='/menus'>Back to Menu</Link>
                </button>
              </div>
              </div><br/>

              <table>
                <tbody>
                <tr>
                  <th></th>
                  <th>Meal</th>
                  <th>Quantity</th>
                  <th>Unit Price(&#8358;)</th>
                  <th>Total Price(&#8358;)</th>
                </tr>
                <tr>
                  <td>
                    <img src={meal.image} alt='' width='100' height='100' />
                  </td>
                  <td>{meal.name}</td>
                  <td>
                    <select 
                      style={{ width: '50px' }} 
                      onChange={this.handleQuantityChange}
                    >
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                      <option value='9'>9</option>
                      <option value='10'>10</option>
                    </select>
                  </td>
                  <td>{meal.price}</td>
                  <td><strong>{this.state.price}</strong></td>
                </tr>
                </tbody>
              </table><br/>

            <div className='row'>
              <div className='c-medium-6 c-small-12 c-xsmall-12' id='pd-0'>

              </div>
              <div 
                className='c-medium-6 c-small-12 c-xsmall-12 amount' 
                id='pd-0'
              >
                <button
                  className='button warning'
                  onClick={this.handleMakeOrder}
                >
                  Confirm Order
                </button>
              </div>
            </div>

            </div>
          </div>
      </div>
    );
  }
}

ConfirmOrder.propTypes = {
  getAMealAction: PropTypes.func.isRequired,
  makeOrderAction: PropTypes.func.isRequired,
  mealState: PropTypes.object.isRequired,
  orderState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  mealState: state.mealReducer,
  orderState: state.orderReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAMealAction, makeOrderAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrder);
