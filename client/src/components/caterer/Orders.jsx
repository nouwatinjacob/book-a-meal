import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CatererHeader from '../partials/CatererHeader.jsx';
import Pagination from '../partials/Pagination.jsx';
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
   *
   * @returns {XML} XML/JSX
   * 
   * @memberof MyMeals
   */
  componentDidMount() {    
    this.props.getAllCatererOrderAction();        
  }
  /**
   * Renders Orders component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    const { orderState: { orders } } = this.props;
    return (
      <div className='container'>
        <CatererHeader/>
        <div className='wrapper'>
        <div className='row'>
          <div className='c-medium-6 c-small-12' id='pd-0'>
            <h5>Sort By Date:
              <input type='date' 
              style={{ width: '150px' }}
              />
            </h5>
          </div>
          <div className='c-medium-6 c-small-12 revenue' id='pd-0'>
            <h5>{`Today's Revenue: `}<strong>&#8358;145,985</strong></h5>
          </div>
        </div>
      </div>
          <div className='wrapper'>
            <table className='order-table'>
            <tbody>
              <tr>
                <th>Order No</th>
                <th>Customer Name</th>
                <th>Price(&#8358;)</th>
                <th>View details</th>
              </tr>
              {
                  orders.length > 0 ?
                  orders.map((order, index) => 
                  <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.User.firstName} {order.User.lastName}</td>
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
            </table>
          </div><br/>
        <Pagination/><br/>
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
