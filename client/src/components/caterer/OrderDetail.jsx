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
export class OrderDetail extends React.Component {
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
          <div className='c-medium-12 c-small-12' id='pd-0'>
            <h6>
              {moment(order.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </h6>
            <h5>Order No: <strong>{order.orderId}</strong></h5>
            <h5>Name: <strong>
                { order.User.ownerName ||
                  `${order.User.firstName} ${order.User.lastName}` }
              </strong>
            </h5>
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
                <td>{order.Meal.name}</td>
                <td>{order.quantity}</td>
                <td>{order.Meal.price}</td>
                <td>{order.quantity * order.Meal.price}</td>
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

export const mapStateToProps = state => ({
  orderState: state.orderReducer
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAnOrderAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
