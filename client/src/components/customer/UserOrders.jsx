import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header.jsx';
import CustomerHeader from '../partials/CustomerHeader.jsx';

class UserOrder extends React.Component {
  render() {
    return (
      <div className='container'>

        <Header/>
        <CustomerHeader/>
        <div class="wrapper">
        <table class="order-table">
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
              <a href="order-details.html"><button class="button default">Edit</button></a>
            </td>
          </tr>
          <tr>
            <td>2018-06-20</td>
            <td>Yakoyo Restaurant</td>
            <td>Fried Rice and Chicken</td>
            <td>3500</td>
            <td>
              <a href="order-details.html"><button class="button default">Edit</button></a>
            </td>
          </tr>
          <tr>
            <td>2018-06-20</td>
            <td>Yakoyo Restaurant</td>
            <td>Fried Rice and Chicken</td>
            <td>3500</td>
            <td>
              <a href="order-details.html"><button class="button default">Edit</button></a>
            </td>
          </tr>
          <tr>
            <td>2018-06-20</td>
            <td>Yakoyo Restaurant</td>
            <td>Fried Rice and Chicken</td>
            <td>3500</td>
            <td>
              <a href="order-details.html"><button class="button default">Edit</button></a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      </div>
    );
  }
}

export default UserOrder;
