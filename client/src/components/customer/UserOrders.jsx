import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrderAction } from '../../actions/orderAction';
import CustomerHeader from '../partials/CustomerHeader.jsx';
import Pagination from '../partials/Pagination.jsx';

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
          <tr>
          <td>{orders[0].createdAt}</td>
          <td>{orders[0].Meal.name}</td>
          <td>{(orders[0].Meal.price) * orders[0].quantity}</td>
          <td>
            <button className='button default' style={{ marginRight: '5px' }}>
              <Link to={`/modify-order/${orders[0].Meal.id}`}>Edit</Link>
            </button>
            <button className='button delete'>Cancel</button>
          </td>
        </tr>
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
  getUserOrderAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orderState: state.orderReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserOrderAction }, dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(UserOrder);
