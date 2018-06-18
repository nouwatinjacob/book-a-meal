import React from 'react';
import { Link } from 'react-router-dom';
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
   * Renders UserOrder component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    return (
      <div className='container'>
        <CustomerHeader/>
        <div className='wrapper'>
        <table className='order-table'>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Caterer Name</th>
            <th>Meal</th>
            <th>Price(&#8358;)</th>
            <th>Details</th>
          </tr>
          <tr>
            <td>2018-06-20</td>
            <td>Yakoyo Restaurant</td>
            <td>Fried Rice and Chicken</td>
            <td>3500</td>
            <td>
              <button className='button default' style={{ marginRight: '5px' }}>
                <Link to='/modify-order/1'>Edit</Link>
              </button>
              <button className='button delete'>Cancel</button>
            </td>
          </tr>
          <tr>
            <td>2018-06-20</td>
            <td>Yakoyo Restaurant</td>
            <td>Fried Rice and Chicken</td>
            <td>3500</td>
            <td>
              <button className='button default' style={{ marginRight: '5px' }}>
                <Link to='/modify-order/1'>Edit</Link>
              </button>
              <button className='button delete'>Cancle</button>
            </td>
          </tr>
          <tr>
            <td>2018-06-20</td>
            <td>Yakoyo Restaurant</td>
            <td>Fried Rice and Chicken</td>
            <td>3500</td>
            <td>
              <button className='button default' style={{ marginRight: '5px' }}>
                <Link to='/modify-order/1'>Edit</Link>
              </button>
              <button className='button delete'>Cancle</button>
            </td>
          </tr>
          <tr>
            <td>2018-06-20</td>
            <td>Yakoyo Restaurant</td>
            <td>Fried Rice and Chicken</td>
            <td>3500</td>
            <td>
              <button className='button default' style={{ marginRight: '5px' }}>
                <Link to='/modify-order/1'>Edit</Link>
              </button>
              <button className='button delete'>Cancle</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div><br/>
      <Pagination/><br/>
      </div>
    );
  }
}

export default UserOrder;
