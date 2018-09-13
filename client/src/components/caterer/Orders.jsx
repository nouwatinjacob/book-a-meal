import React from 'react';
import ReactPaginate from "react-paginate";
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CatererHeader from '../partials/CatererHeader.jsx';
import { getAllCatererOrderAction } from '../../actions/orderAction';

/**
 * Orders class declaration
 *
 * @class Orders
 *
 * @extends {React.Component}
 */
class Orders extends React.Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf App
   */
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.getOrderPrices = this.getOrderPrices.bind(this);
    this.totalPrice = this.totalPrice.bind(this);
  }

  /**
   *
   * @returns {XML} XML/JSX
   *
   * @memberof MyMeals
   */
  componentDidMount() {
    const orderDate = new Date().toISOString().slice(0, 10);
    this.props.getAllCatererOrderAction({
      orderDate, limit: 10, offset: 0
    });
  }

  /**
   * Handles pagination click
   *
   * @method handleDateChange
   *
   * @param { event } event
   *
   * @return {void}
  */
 handleDateChange = (event) => {
   const searchDate = event.target.value;
   this.props.getAllCatererOrderAction({
     orderDate: searchDate, limit: 10, offset: 0
   });
 }

 /**
   * Calculate order Price
   *
   * @method getOrderPrices
   *
   * @param { orders } orders
   *
   * @return {void}
  */
 getOrderPrices = orders =>
   orders.map(order => order.Meal.price * order.quantity);

   /**
   * Calculate Total Revenue
   *
   * @method totalPrice
   *
   * @param { prices } prices
   *
   * @return {void}
  */
 totalPrice = prices => prices.reduce((a, b) => a + b);

 /**
   * Handles pagination click
   *
   * @method handlePageClick
   *
   * @param { object } data
   *
   * @return {void}
   */
 handlePageClick(data) {
   const { limit } = this.props.orderState.paginate;
   const nextOffset = data.selected * limit;
   const currentDate = this.props.orderState
     .orderDetails[0].createdAt.slice(0, 10);

   this.props.getAllCatererOrderAction({
     orderDate: currentDate, limit, offset: nextOffset
   });
 }

  /**
   * Renders Orders component
   *
   * @returns {XML} XML/JSX
   */
 render() {
   const { orderState: { orderDetails } } = this.props;
   const { orderState: { paginate } } = this.props;
   return (
      <div className='container'>
        <CatererHeader/>
        <div className='wrapper'>
        <div className='row'>
          <div className='c-medium-6 c-small-12' id='pd-0'>
            <h5>Sort By Date:
              <input type='date'
                style={{ width: '150px' }}
                onChange={this.handleDateChange}
              />
            </h5>
          </div>
          <div className='c-medium-6 c-small-12 revenue' id='pd-0'>
            <h5>{`Today's Revenue: `}<strong>&#8358;
              {
                orderDetails.length > 0 ?
                this.totalPrice(this.getOrderPrices(orderDetails)) : 0
              }
            </strong>
            </h5>
          </div>
        </div>
      </div>

          <div className='wrapper'>
          {
            orderDetails.length > 0 ?
            <table className='order-table'>
            <tbody>
              <tr>
                <th>Order No</th>
                <th>Customer Name</th>
                <th>Price(&#8358;)</th>
                <th>View details</th>
              </tr>
              {
                  orderDetails.length > 0 ?
                  orderDetails.map((order, index) =>
                  <tr key={index}>
                  <td>{order.orderId}</td>
                  <td>{order.User.ownerName ||
                    (`${order.User.firstName} ${order.User.lastName}`)}</td>
                  <td>{order.Meal.price * order.quantity}</td>
                  <td>
                    <button className='button default'>
                      <Link to={`/order-detail/${order.id}`}>View details</Link>
                    </button>
                  </td>
                </tr>) :
                <tr></tr>
              }

              </tbody>
            </table> :
              <h3 className='text-center'>No Order Found for this date</h3>
            }
          </div><br/>
          {
                paginate && paginate.itemCount > 10 ?
                <div className="wrapper search">
                  <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageCount={paginate.page}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </div>
                :
                ''
              }
        <br/>
      </div>
   );
 }
}

Orders.propTypes = {
  getAllCatererOrderAction: PropTypes.func.isRequired,
  orderState: PropTypes.object
};

const mapStateToProps = state => ({
  orderState: state.orderReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllCatererOrderAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
