import React from 'react';
import moment from 'moment';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CatererHeader from '../partials/CatererHeader.jsx';
import { getAnOrderAction } from '../../actions/orderAction';

/**
 * OrderDetail class declaration
 *
 * @class OrderDetail
 *
 * @extends {React.Component}
 */
class OrderDetail extends React.Component {
  /**
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof MyMeals
   */
  componentDidMount() {
    const orderId = this.props.match.params.orderId;
    this.props.getAnOrderAction(orderId);
  }
  /**
   * Renders OrderDetail component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const { orderState: { order: { order } } } = this.props;
    return (
      <div className='container'>
        <CatererHeader/>
        <div className='wrapper'>
        { order ? 
        <div className='reduced-container'>
          <div className='row'>
          <div className='c-medium-6 c-small-12' id='pd-0'>
            <h6>
              {moment(order.order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </h6>
            <h5>Order No: <strong>{order.order.id}</strong></h5>
            <h5>Name: 
              <strong>
                {order.order.User.firstName} {order.order.User.lastName}
              </strong>
            </h5>
          </div>
          <div className='c-medium-6 c-small-12' id='pd-0'>
          </div>
          </div><br/>
        
          <table>
            <tbody>
              <tr>
                <th>Meal</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
              <tr>
                <td>{order.order.Meal.name}</td>
                <td>{order.order.quantity}</td>
                <td>{order.order.Meal.price}</td>
                <td>{order.order.quantity * order.order.Meal.price}</td>
              </tr>
            </tbody>
          </table>

        </div>
        : <div></div>
        }
      </div>
      </div>
    );
  }
}

OrderDetail.propTypes = {
  getAnOrderAction: PropTypes.func.isRequired,
  match: PropTypes.object,
  orderState: PropTypes.object
};

const mapStateToProps = state => ({
  orderState: state.orderReducer
});

const mapDispatchToProps = dispatch => 
  bindActionCreators({ getAnOrderAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
