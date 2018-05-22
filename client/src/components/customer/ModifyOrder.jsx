import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header.jsx';
import CustomerHeader from '../partials/CustomerHeader.jsx';
import photo from '../../assets/img/fried-rice.jpg';

class ModifyOrder extends React.Component {
  render() {
    return (
      <div className='container'>

        <Header/>
        <CustomerHeader/>
          <div className='wrapper'>
            <div className='reduced-container'>
              <div className='row'>
              <div className='c-medium-6 c-small-12 c-xsmall-12' id='pd-0'>
                <h3>Edit your Order</h3>
              </div>
              </div><br/>

              <table>
                <tbody>
                <tr>
                  <th></th>
                  <th>Meal</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Sub Total</th>
                </tr>
                <tr>
                  <td><img src={photo} alt='' width='50' height='50' /></td>
                  <td>Fried Rice</td>
                  <td>
                    <select style={{ width: '50px' }}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                  </td>
                  <td>2000</td>
                  <td>2000</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><strong>Total: &#8358;9000</strong></td>
                </tr>
                </tbody>
              </table><br/>

            <div className='row'>
              <div className='c-medium-6 c-small-12 c-xsmall-12' id='pd-0'>

              </div>
              <div className='c-medium-6 c-small-12 c-xsmall-12 amount' id='pd-0'>
                <button className='button warning'>
                  Modify Order
                </button>
              </div>
            </div>

            </div>
          </div>
      </div>
    );
  }
}

export default ModifyOrder;
