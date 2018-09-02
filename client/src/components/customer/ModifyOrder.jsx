import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert';
import { getAnOrderAction, modifyOrderAction } from '../../actions/orderAction';
import CustomerHeader from '../partials/CustomerHeader.jsx';
import CatererHeader from '../partials/CatererHeader.jsx';
import { decodeToken } from '../../utils/helper';

/**
 * ModifyOrder class declaration
 *
 * @class ModifyOrder
 *
 * @extends {React.Component}
 */
class ModifyOrder extends React.Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf App
   */
  constructor(props) {
    super(props);
    this.state = {
      quantity: undefined,
      newOrderDetail: {
        quantity: undefined,
      }
    };
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   *
   * @param  {object} props
   *
   * @param  {object} state
   *
   * @returns {XML} XML/JSX
   *
   * @memberof MyMeals
   */
  static getDerivedStateFromProps(props, state) {
    const { orderState: { order: { order } } } = props;
    const quantity = (order && order.order && order.order.quantity);
    return { ...state, quantity: state.quantity || quantity };
  }

  /**
   *
   * @returns {XML} XML/JSX
   *
   * @memberof ModifyOrder
   */
  componentDidMount() {
    const data = JSON.parse(sessionStorage.getItem('ids'));
    if (data) {
      this.props.getAnOrderAction(data[2]);
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
  handleQuantityChange(event) {
    const quantity = parseInt(event.currentTarget.value, 10);

    this.setState({ quantity, newOrderDetail: { quantity } });
  }

  /**
   * Handles quantity change
   *
   * @method handleSubmit
   *
   * @param {event} event
   *
   * @param {event} unitPrice
   *
   * @return {void}
  */
  handleSubmit(event) {
    event.preventDefault();
    const data = JSON.parse(sessionStorage.getItem('ids'));
    const orderId = parseInt(data[2], 10);
    const { newOrderDetail } = this.state;
    this.props.modifyOrderAction(orderId, newOrderDetail).then(() => {
      if (this.props.orderState.success) {
        swal("Order Modified Successfully!", "", "success");
      } else {
        const message = this.props.orderState.error.message;
        const notify = () => toast.info(message);
        notify();
      }
    });
  }

  /**
   * Renders ModifyOrder component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const { orderState: { order: { order } } } = this.props;
    const { quantity } = this.state;
    const token = localStorage.getItem('token');
    const userToken = decodeToken(token);
    return (
      <div className='container'>
        {
          userToken.userType === 'customer' ?
          <CustomerHeader/> : <CatererHeader/>
        }
          <div className='wrapper'>
            <ToastContainer />
            <div className='reduced-container'>
              <div className='row'>
              <div className='c-medium-6 c-small-12 c-xsmall-12' id='pd-0'>
                <h3>Edit your Order</h3>
              </div>
              </div><br/>
              { order ?
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
                    <img src={order && order.order.Meal.image}
                    alt=''
                    width='50'
                    height='50'
                  />
                  </td>
                  <td>{order && order.order.Meal.name}</td>
                  <td>
                    <input
                      type='number'
                      name='quantity'
                      value={quantity}
                      style={{ width: '50px' }}
                      min='1'
                      max='20'
                      onChange={this.handleQuantityChange}
                    />
                  </td>
                  <td>{order && order.order.Meal.price}</td>
                  <td>
                    <strong>
                    {
                      (order.order.Meal.price) *
                      (quantity || order.order.quantity)
                      }
                    </strong>
                  </td>
                </tr>
                </tbody>

              </table>
              : '' }<br/>

            <div className='row'>
              <div className='c-medium-6 c-small-12 c-xsmall-12' id='pd-0'>

              </div>
              <div
                className='c-medium-6 c-small-12 c-xsmall-12 amount'
                id='pd-0'
              >
                <button
                  className='button warning'
                  onClick={this.handleSubmit}
                >
                  Modify Order
                </button>
              </div>
            </div>

            </div>
          </div>
      </div>
    );
  }
}

ModifyOrder.propTypes = {
  getAnOrderAction: PropTypes.func.isRequired,
  modifyOrderAction: PropTypes.func.isRequired,
  orderState: PropTypes.object
};

const mapStateToProps = state => ({
  orderState: state.orderReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAnOrderAction, modifyOrderAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModifyOrder);
