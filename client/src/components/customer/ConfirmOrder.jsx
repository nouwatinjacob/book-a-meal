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
  /**
   * Component constructor
   * @param {object} props
   * @memberOf App
   */
  constructor(props) {
    super(props);
    const ids = JSON.parse(sessionStorage.getItem('ids'));

    this.state = {
      meal: {},
      orderDetail: {
        mealId: ids[0],
        quantity: 1,
        menuId: ids[1]
      }
    };
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleMakeOrder = this.handleMakeOrder.bind(this);
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
    const ids = JSON.parse(sessionStorage.getItem('ids'));
    if (!ids) {
      history.push('/menus');
    } else {
      this.props.getAMealAction(ids[0]);
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
    event.preventDefault();
    const quantity = parseInt(event.currentTarget.value, 10);
    this.setState(state => (
      {
        orderDetail: { ...state.orderDetail, quantity }
      }));
  }

  /**
   * Handles quantity change
   *
   * @method handleMakeOrder
   *
   * @param {event} event
   *
   * @return {void}
  */
  handleMakeOrder = (event) => {
    event.preventDefault();
    const { orderDetail } = this.state;
    this.props.makeOrderAction(orderDetail).then(() => {
      if (this.props.orderState.success) {
        swal("Order Placed Successfully!");
        history.push('/user-order');
        sessionStorage.clear();
      } else if (
        !this.props.orderState.success && this.props.orderState.error
      ) {
        const message = this.props.orderState.error.message;
        const notify = () => toast.info(message);
        notify();
      }
    });
  }

  /**
   * Renders ConfirmOrder component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const { mealState: { meal } } = this.props || {};
    const { quantity } = this.state.orderDetail;
    const token = localStorage.getItem('token');
    const userToken = decodeToken(token);

    return !!meal && (
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
                  <input
                      type='number'
                      name='quantity'
                      value={this.state.orderDetail.quantity}
                      style={{ width: '100px' }}
                      min='1'
                      max='20'
                      onChange={this.handleQuantityChange}
                    />
                  </td>
                  <td>{meal.price}</td>
                  <td>
                    <strong>
                      {
                        meal ? (meal.price) *
                        (this.state.orderDetail.quantity) : null
                      }
                    </strong>
                  </td>
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
          <ToastContainer />
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
