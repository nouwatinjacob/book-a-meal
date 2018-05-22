import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header.jsx';
import CustomerHeader from '../partials/CustomerHeader.jsx';
import Pagination from '../partials/Pagination.jsx';

class UserOrder extends React.Component {
  render() {
    return (
      <div className='container'>

        <Header/>
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
