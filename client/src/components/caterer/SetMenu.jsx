import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import swal from 'sweetalert';
import { getMeals } from '../../actions/mealAction';
import { setMenuAction } from '../../actions/menuAction';
import CatererHeader from '../partials/CatererHeader.jsx';
import menuValidation from '../../utils/menuValidation';
import Errors from '../partials/ValidationErrors.jsx';

/**
 * SetMenu class declaration
 *
 * @class SetMenu
 *
 * @extends {React.Component}
 */
class SetMenu extends React.Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf App
   */
  constructor(props) {
    super(props);
    this.state = {
      menuData: {
        menuDate: '',
        mealId: []
      },
      errors: [],
      meals: [],
      check: false,
      loading: true
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }


  /**
   *
   * @param  {object} props
   *
   * @param  {object} state
   *
   * @returns {XML} XML/JSX
   *
   * @memberof SetMenu
   */
  static getDerivedStateFromProps(props, state) {
    if (props.mealState.success) {
      state.meals = props.mealState.meals;
      state.loading = false;
    }
    return state;
  }

  /**
   *
   * @returns {XML} XML/JSX
   *
   * @memberof SetMenu
   */
  componentDidMount() {
    this.props.getMeals({ limit: 5, offset: 0 });
  }

  /**
  * Handle onInputChange
  *
  * @param {event} event
  *
  * @return {event} event
  *
  */
 onDateChange = (event) => {
   const menuData = this.state.menuData;
   const date = event.target.value;
   menuData.menuDate = date;

   this.setState(menuData);
 }

 /**
  * Handle onInputChange
  *
  * @param {event} event
  *
  * @return {event} event
  *
  */
 onCheck = (event) => {
   const menuData = this.state.menuData;
   const id = event.target.value;
   if (!menuData.mealId.includes(id)) {
     menuData.mealId.push(id);
   } else {
     menuData.mealId.splice(menuData.mealId.indexOf(id), 1);
   }
   this.setState(menuData);
 }

 /**
  * Handle onFormSubmit
  *
  * @param {event} event
  *
  * @return {event} event
  *
  */
 onFormSubmit = (event) => {
   event.preventDefault();
   const menuData = this.state.menuData;
   const validation = menuValidation(menuData);
   if (validation.isValid()) {
     this.props.setMenuAction(menuData).then(() => {
       if (this.props.menuState.success) {
         swal("Menu set Successfully!", "", "success");
       } else if (!this.props.menuState.success && this.props.menuState.error) {
         const message = this.props.menuState.error.message;
         const notify = () => toast.info(message);
         notify();
       }
     });
   } else {
     this.setState(state => ({ errors: validation.errors }));
   }
 }

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
   const nextOffset = (data.selected) * limit;

   this.props.getMeals({ limit, offset: nextOffset });
 }

  /**
   * Renders SetMenu component
   *
   * @returns {XML} XML/JSX
   */
 render() {
   const { meals, loading } = this.state;
   const { paginate } = this.props.mealState;
   const yesterday = moment().toISOString().slice(0, 10);
   return (
      <div className='container'>
        <ToastContainer />
        <CatererHeader/>
          <div className='wrapper'>
            <div className='login'>
              <div className='login-form'>
                <h3>Add New Menu</h3>
                <form onSubmit={this.onFormSubmit}>
                  <input
                    type='date'
                    name='date'
                    id='my-input'
                    min={yesterday}
                    onChange={this.onDateChange}
                  />
                  <br/>
                  {
                    this.state.errors.menuDate ?
                    <span>Pick a date for your menu</span>
                    : ''
                  }
                  <h6>Pick meals to be added to your Menu</h6>
                  {
                    this.state.errors.mealId ?
                    <span>Pick meals to be added to the menu</span>
                    : ''
                  }
                  {meals.map(meal => <p className='paragraph' key={meal.id}>
                    <input
                      type="checkbox"
                      id={meal.id}
                      value={meal.id}
                      onChange={this.onCheck}
                    />
                    <label htmlFor="test1">{meal.name}</label>
                  </p>)}
                  {
                    paginate && paginate.itemCount > 5 ?
                    <div className='wrapper search'>
                      <ReactPaginate
                        previousLabel={'<<'}
                        nextLabel={'>>'}
                        breakLabel={<a href=''>...</a>}
                        breakClassName={'break-me'}
                        pageCount={paginate ? paginate.page : 1}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                      />
                    </div>
                    :
                    ''
                  }
                  <button
                    className='button warning'
                    id='long-button'
                  >Save
                  </button>
                </form>
              </div>

            </div>

          </div>
      </div>
   );
 }
}

SetMenu.propTypes = {
  getMeals: PropTypes.func.isRequired,
  menuState: PropTypes.object.isRequired,
  mealState: PropTypes.object.isRequired,
  setMenuAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  menuState: state.menuReducer,
  mealState: state.mealReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getMeals, setMenuAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SetMenu);