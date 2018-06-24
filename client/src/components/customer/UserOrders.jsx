import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrderAction } from '../../actions/orderAction';
import CustomerHeader from '../partials/CustomerHeader.jsx';
import Pagination from '../partials/Pagination.jsx';
import history from '../../utils/history';

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
   * Renders UserOrder component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const { orderState: { orders: { orders } } } = this.props;
    return (
      <div className='container'>
        <CustomerHeader/>
        <div className='wrapper'>
        { orders ?
        <table className='order-table'>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Meal</th>
            <th>Price(&#8358;)</th>
            <th>Details</th>
          </tr>
          {orders.map((order, index) => 
          <tr key={index}>
          <td>{order.createdAt.slice(0, 10)}</td>
          <td>{order.Meal.name}</td>
          <td>{(order.Meal.price) * order.quantity}</td>
          <td>
            <button
              className='button default'
              style={{ marginRight: '5px' }}
              onClick={event => 
                this.handleModify(order.mealId, order.menuId, order.id, event)}
            >
              Edit
            </button>
            <button className='button delete'>Cancel</button>
          </td>
        </tr>)}
          </tbody>
        </table> :
        <p>You have no Order</p>
        }
      </div><br/>
      <Pagination/><br/>
      </div>
    );
  }
}

UserOrder.propTypes = {
  getUserOrderAction: PropTypes.func.isRequired,
  orderState: PropTypes.object
};

const mapStateToProps = state => ({
  orderState: state.orderReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserOrderAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserOrder);
