import React from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "react-proptypes";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import swal from 'sweetalert';
import history from "../../utils/history";
import { getMenuAction } from "../../actions/menuAction";
import CustomerHeader from "../partials/CustomerHeader.jsx";
import CatererHeader from "../partials/CatererHeader.jsx";
import { decodeToken } from "../../utils/helper";

/**
 * MenuMeal class declaration
 *
 * @class MenuMeal
 *
 * @extends {React.Component}
 */
class MenuMeal extends React.Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf App
   */
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      loading: false
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.onClickOrder = this.onClickOrder.bind(this);
  }

  /**
   *
   * @returns {XML} XML/JSX
   *
   * @memberof MenuMeal
   */
  componentDidMount() {
    const todayDate = new Date().toISOString().slice(0, 10);
    this.props.getMenuAction({ todayDate, limit: 10, offset: 0 });
  }

  /**
   *
   * @returns {XML} XML/JSX
   *
   * @memberof MenuMeal
   */
  componentWillUnmount() {
    this.isCancelled = true;
  }

  /**
   * Handles makeOrder button
   *
   * @method onClickOrder
   *
   * @param { event } event
   *
   * @return {void}
   */
  handleDateChange = (event) => {
    const searchDate = event.target.value.toString();
    this.props.getMenuAction({ todayDate: searchDate, limit: 10, offset: 0 });
  };

  /**
   * Handles makeOrder button
   *
   * @method onClickOrder
   *
   * @param { object } mealId
   *
   * @param { object } menuId
   *
   * @param { array } mealUserId
   *
   * @param { int } userId
   *
   * @param { event } event
   *
   * @return {void}
   */
  onClickOrder = (mealId, menuId, mealUserId, userId, event) => {
    const user1 = this.props.menuState.menus.dateMenu.filter(caterer =>
      (caterer.userId === mealUserId));
    if (user1[0].userId === userId) {
      swal("You can not order this meal");
    } else {
      const idsArray = [];
      idsArray.push(mealId, menuId);
      sessionStorage.setItem("ids", JSON.stringify(idsArray));
      history.push("/confirm-order");
    }
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
    const { limit } = this.props.menuState.menus.paginate;
    const currentMenuDate = this.props.menuState.menus
      .dateMenu[0].menuDate.slice(0, 10);
    const nextOffset = data.selected * limit;

    this.props.getMenuAction({
      todayDate: currentMenuDate,
      limit,
      offset: nextOffset
    });
  }

  /**
   * Check if the menu is of Yesterday
   *
   * @method checkYesterdayMenu
   *
   * @return {void}
   */
  checkYesterdayMenu() {
    const menuDate = this.props.menuState.menus
      .dateMenu[0].createdAt.slice(0, 10);
    const todayDate = new Date().toISOString().slice(0, 10);
    if (menuDate === todayDate) {
      return true;
    }
    return false;
  }

  /**
   * Check if a meal belong to the logged in Caterer
   *
   * @method checkCatererMeal
   *
   * @param { Array } caterers
   *
   * @param { int } userId
   *
   * @return {void}
   */
  getCatererIds(caterers) {
    const ids = caterers.reduce((acc, caterer) => acc.concat(caterer.id), []);
    return ids;
  }

  /**
   * Renders MenuMeal component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const {
      menuState: {
        menus: { dateMenu }
      }
    } = this.props;
    const {
      menuState: {
        menus: { paginate }
      }
    } = this.props;

    // get the meals details and the menu id
    const menuMeals = dateMenu.reduce(
      (acc, menu) =>
        acc.concat(menu.Meals.map(meal => ({
          ...meal,
          menuId: menu.id
        }))),
      []
    );
    // get the caterers in an array
    const caterers = dateMenu.reduce((acc, user) => acc.concat(user.User), []);
    const token = localStorage.getItem("token");
    const userToken = decodeToken(token);
    return (
      <div>
        <div className="container">
          {userToken.userType === "customer" ? (
            <CustomerHeader />
          ) : (
            <CatererHeader />
          )}
          <div className="wrapper">
            <div className="wrapper search">
              <label>Search by date</label>
              <input type="date" onChange={this.handleDateChange} />
            </div>

            <div className="row">
              {dateMenu.length > 0 ? (
                menuMeals.map((meal, index) => (
                  <div
                    className="c-medium-3 c-xsmall-12 c-3"
                    id="pd-0"
                    key={index}
                  >
                    <div className="box">
                      <div id="menu-image">
                        <img src={meal.image} alt="Avatar" />
                      </div>
                      <div className="box-body">
                        <div className="row">
                          <div
                            className="c-medium-12 c-xsmall-12 text-center"
                            id="pd-0"
                          >
                            <p>
                              <i>
                                {
                                  caterers.find(caterer =>
                                    caterer.id === meal.userId).businessName
                                }
                              </i>
                            </p>
                            <p>
                              <b>{meal.name}</b>
                            </p>
                            <p>Price {meal.price}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="c-medium-12 c-xsmall-12 text-center"
                            id="pd-0"
                          >
                          {
                            this.checkYesterdayMenu() ?
                            <button
                            className='button warning'
                            onClick={event =>
                              this.onClickOrder(
                                meal.id,
                                meal.menuId,
                                meal.userId,
                                userToken.id,
                                event
                              )
                            }
                          >
                            Order Meal
                          </button> : ''
                          }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="wrapper">
                  <h3 className="text-center mt-10">
                    No Menu to display for this date
                  </h3>
                </div>
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
              ''
            )}
          </div>
        </div>
        <br />
      </div>
    );
  }
}

MenuMeal.propTypes = {
  getMenuAction: PropTypes.func.isRequired,
  menuState: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  menuState: state.menuReducer
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getMenuAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuMeal);
