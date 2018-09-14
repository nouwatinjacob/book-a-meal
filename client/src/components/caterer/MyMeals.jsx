import React from "react";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
import PropTypes from "react-proptypes";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMeals, deleteMealAction } from "../../actions/mealAction";
import CatererHeader from "../partials/CatererHeader.jsx";
import Meals from "./Meals.jsx";

/**
 * MyMeals class declaration
 *
 * @class MyMeals
 *
 * @extends {React.Component}
 */
export class MyMeals extends React.Component {
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
    this.handleDelete = this.handleDelete.bind(this);
  }

  /**
   *
   * @param  {object} nextProps
   *
   * @param  {object} prevState
   *
   * @returns {XML} XML/JSX
   *
   * @memberof MyMeals
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = {};
    if (nextProps.mealState.success) {
      nextState.meals = nextProps.mealState.meals;
      nextState.loading = false;
    }
    return nextState;
  }

  /**
   *
   * @returns {XML} XML/JSX
   *
   * @memberof MyMeals
   */
  componentDidMount() {
    this.props.getMeals({ limit: 10, offset: 0 });
  }

  /**
   * Handles meal deletion
   *
   * @method handleDelete
   *
   * @param { object } mealId
   *
   * @return {void}
   */
  handleDelete = (mealId) => {
    this.props.deleteMealAction(mealId);
    window.location.reload();
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
    const { limit } = this.props.mealState.paginate;
    const nextOffset = data.selected * limit;

    this.props.getMeals({ limit, offset: nextOffset });
  }

  /**
   * Renders MyMeals component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const { meals, loading } = this.state;
    const { paginate } = this.props.mealState;
    return (
      <div>
        {meals.length > 0 ? (
          loading ? (
            <div className="container loading">
              <Loader type="Rings" color="#ff9600" height="100" width="100" />
              <h3>Loading...</h3>
            </div>
          ) : (
            <div className="container">
              <ToastContainer />
              <CatererHeader />
              <h2 className='text-center'>Manage Meals</h2><br/>
              <div className="wrapper">
                <table>
                  <tbody>
                    <tr>
                      <th>Meal Name</th>
                      <th>Image</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                    {meals.map(meal => (
                      <Meals
                        key={meal.id}
                        meals={meal}
                        deleteAction={this.handleDelete}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <br />
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
              <br />
            </div>
          )
        ) : (
          <div>
            <CatererHeader />
            <h3 className="text-center">No Meals to display </h3>
          </div>
        )}
      </div>
    );
  }
}

MyMeals.propTypes = {
  deleteMealAction: PropTypes.func.isRequired,
  getMeals: PropTypes.func.isRequired,
  mealState: PropTypes.object.isRequired,
  match: PropTypes.object,
  paginate: PropTypes.object
};

export const mapStateToProps = state => ({
  mealState: state.mealReducer
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getMeals, deleteMealAction }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMeals);
