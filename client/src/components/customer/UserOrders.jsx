import React from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "react-proptypes";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import swal from "sweetalert";
import {
  getUserOrderAction,
  cancelOrderAction
} from "../../actions/orderAction";
import CustomerHeader from "../partials/CustomerHeader.jsx";
import CatererHeader from "../partials/CatererHeader.jsx";
import history from "../../utils/history";
import { decodeToken } from "../../utils/helper";

/**
 * UserOrder class declaration
 *
 * @class UserOrder
 *
 * @extends {React.Component}
 */
class UserOrder extends React.Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf App
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      meals: [],
      loading: true
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleCancelOrder = this.handleCancelOrder.bind(this);
  }

  /**
   *
   * @returns {XML} XML/JSX
   *
   * @memberof UserOrder
   */
  componentDidMount() {
    this.props.getUserOrderAction({ limit: 10, offset: 0 });
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
    sessionStorage.setItem("ids", JSON.stringify(idsArray));
    history.push(`/modify-order/${orderId}`);
  };

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
          icon: "success"
        });
      }
    });
  };

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
    const { limit } = this.props.orderState.orders.paginate;
    const nextOffset = data.selected * limit;

    this.props.getUserOrderAction({ limit, offset: nextOffset });
  }

  /**
   * Renders UserOrder component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const { orderState: { orders: { orders } } } = this.props;
    const { orderState: { orders: { paginate } } } = this.props;
    const token = localStorage.getItem("token");
    const userToken = decodeToken(token);
    return (
      <div className="container">
        {userToken.userType === "customer" ? (
          <CustomerHeader />
        ) : (
          <CatererHeader />
        )}
        <ToastContainer />
        <div className="wrapper">
          <h1 className="text-center">Order List</h1>
          {this.props.isSuccessful &&
          orders !== undefined &&
          orders.length > 0 ? (
            <table className="order-table">
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Order No</th>
                  <th>Meal</th>
                  <th>Price(&#8358;)</th>
                  <th>Actions</th>
                </tr>
                {orders && orders.map((order, index) => {
                  const expiredTime = moment(order.createdAt)
                    .add(5, "minutes") > moment();
                  return (
                    <tr key={index}>
                      <td>{order.createdAt.slice(0, 10)}</td>
                      <td>{order.orderId}</td>
                      <td>{order.Meal.name}</td>
                      <td>{order.Meal.price * order.quantity}</td>
                      {expiredTime ? (
                        <td>
                          <button
                            className="button warning"
                            style={{ marginRight: "5px" }}
                            onClick={event =>
                              this.handleModify(
                                order.mealId,
                                order.menuId,
                                order.id,
                                event
                              )
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="button danger"
                            onClick={event =>
                              this.handleCancelOrder(order.id, event)
                            }
                          >
                            Cancel
                          </button>
                        </td>
                      ) : (
                        <td>Cannot modify</td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h3 className="text-center">You have no Order</h3>
          )}
        </div>
        <br />
        {
          paginate && paginate.itemCount > 10 ? (
          <div className="wrapper search">
            <ReactPaginate
              previousLabel={"<<"}
              nextLabel={">>"}
              breakLabel={<a href="">...</a>}
              breakClassName={"break-me"}
              pageCount={paginate ? paginate.page : 1}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        ) : (
          ""
        )}
        <br />
      </div>
    );
  }
}

UserOrder.propTypes = {
  getUserOrderAction: PropTypes.func.isRequired,
  cancelOrderAction: PropTypes.func,
  orderState: PropTypes.object,
  isSuccessful: PropTypes.bool
};

const mapStateToProps = state => ({
  orderState: state.orderReducer,
  isSuccessful: state.orderReducer.success
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserOrderAction, cancelOrderAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserOrder);
