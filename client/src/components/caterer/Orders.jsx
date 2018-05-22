import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header.jsx';
import CatererHeader from '../partials/CatererHeader.jsx';
import Pagination from '../partials/Pagination.jsx';

class Orders extends React.Component {
  render() {
    return (
      <div className='container'>

        <Header/>
        <CatererHeader/>
        <div className='wrapper'>
        <div className='row'>
          <div className='c-medium-6 c-small-12' id='pd-0'>
            <h5>Sort By Date: <input type='date' style={{ width: '150px' }}/></h5>
          </div>
          <div className='c-medium-6 c-small-12 revenue' id='pd-0'>
            <h5>Today's Revenue: <strong>&#8358;145,985</strong></h5>
          </div>
        </div>
      </div>
          <div className='wrapper'>
            <table className='order-table'>
            <tbody>
              <tr>
                <th>Customer Name</th>
                <th>Order No</th>
                <th>Price(&#8358;)</th>
                <th>View details</th>
              </tr>
              <tr>
                <td>Okafor Emmanuel</td>
                <td>#1234hHG-FG</td>
                <td>3500</td>
                <td>
                  <button className='button default'>
                    <Link to='/order-detail'>View details</Link>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Okafor Emmanuel</td>
                <td>#1234hHG-FG</td>
                <td>3500</td>
                <td>
                  <button className='button default'>
                    <Link to='/order-detail'>View details</Link>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Okafor Emmanuel</td>
                <td>#1234hHG-FG</td>
                <td>3500</td>
                <td>
                  <button className='button default'>
                    <Link to='/order-detail'>View details</Link>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Okafor Emmanuel</td>
                <td>#1234hHG-FG</td>
                <td>3500</td>
                <td>
                  <button className='button default'>
                    <Link to='/order-detail'>View details</Link>
                  </button>
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

export default Orders;
