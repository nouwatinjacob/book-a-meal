import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header.jsx';
import CatererHeader from '../partials/CatererHeader.jsx';
import Pagination from '../partials/Pagination.jsx';

class OrderDetail extends React.Component {
  render() {
    return (
      <div className='container'>

        <Header/>
        <CatererHeader/>
        <div className='wrapper'>
        <div className='reduced-container'>
          <div className='row'>
          <div className='c-medium-6 c-small-12' id='pd-0'>
            <h6>20/04/2018</h6>
            <h5>Order No: <strong>#1234HGYT-FG</strong></h5>
            <h5>Name: <strong>Aderibigbe Bolanle</strong></h5>
          </div>
          <div className='c-medium-6 c-small-12' id='pd-0'>
          </div>
          </div><br/>

          <table>
            <tr>
              <th>Meal</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>Chicken Laps</td>
              <td>3</td>
              <td>2000</td>
              <td>6000</td>
            </tr>
          </table>

        </div>
      </div>
      </div>
    );
  }
}

export default OrderDetail;
