import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import {
  getUserOrderAction,
  cancelOrderAction
} from '../../actions/orderAction';
import CustomerHeader from '../partials/CustomerHeader.jsx';
import Pagination from '../partials/Pagination.jsx';
import CatererHeader from '../partials/CatererHeader.jsx';
import history from '../../utils/history';
import { decodeToken } from '../../utils/helper';

/**
 * UserOrder class declaration
 *
 * @class UserOrder
 *
 * @extends {React.Component}
 */
class UserOrder extends React.Component {
  /**
   *
   * @returns {XML} XML/JSX
   *
   * @memberof UserOrder
  */
  componentDidMount() {
    this.props.getUserOrderAction();
  }

  /**
   * Handles modify on click of modify
   *
   * @method handleModify
   *
   * @param {mealId} mealId
   *
   * @param {menuId} menuId
   *
   * @param {orderId} orderId
   *
   * @param {event} event
   *
   * @return {void}
  */
  handleModify = (mealId, menuId, orderId, event) => {
    const idsArray = [];
    idsArray.push(mealId, menuId, orderId);
    sessionStorage.setItem('ids', JSON.stringify(idsArray));
    history.push(`/modify-order/${orderId}`);
  }

  /**
   * Handles cancel order on click of cancel
   *
   * @method handleCancelOrder
   *
   * @param {orderId} orderId
   *
   * @param {event} event
   *
   * @return {void}
  */
  handleCancelOrder = (orderId, event) => {
    this.props.cancelOrderAction(orderId).then(() => {
      if (this.props.orderState.success) {
        swal("Order successfully Cancelled!", {
          icon: "success",
        });
        window.location.reload();
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
   * Renders UserOrder component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const { orderState: { orders: { orders } } } = this.props;
    const token = localStorage.getItem('token');
    const userToken = decodeToken(token);
    return (
      <div className='container'>
        {
          userToken.userType === 'customer' ?
          <CustomerHeader/> : <CatererHeader/>
        }
        <div className='wrapper'>
        <ToastContainer/>
        { this.props.orderState.success && orders.length > 0 ?
        <table className='order-table'>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Order No</th>
            <th>Meal</th>
            <th>Price(&#8358;)</th>
            <th>Details</th>
          </tr>
          {orders.map((order, index) =>
          <tr key={index}>
          <td>{order.createdAt.slice(0, 10)}</td>
          <td>{order.orderId}</td>
          <td>{order.Meal.name}</td>
          <td>{(order.Meal.price) * order.quantity}</td>
          <td>
            <button
              className='button warning'
              style={{ marginRight: '5px' }}
              onClick={event =>
                this.handleModify(order.mealId, order.menuId, order.id, event)}
            >
              Edit
            </button>
            <button
              className='button danger'
              onClick={event => this.handleCancelOrder(order.id, event)}
            >
              Cancel
            </button>
          </td>
        </tr>)}
          </tbody>
        </table> :
        <h3 className='text-center'>You have no Order</h3>
        }
      </div><br/>
      {/* <Pagination/><br/> */}
      </div>
    );
  }
}

UserOrder.propTypes = {
  getUserOrderAction: PropTypes.func.isRequired,
  cancelOrderAction: PropTypes.func,
  orderState: PropTypes.object
};

const mapStateToProps = state => ({
  orderState: state.orderReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserOrderAction, cancelOrderAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserOrder);
