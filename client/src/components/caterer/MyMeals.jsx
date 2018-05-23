import React from 'react';
import { Link } from 'react-router-dom';
import CatererHeader from '../partials/CatererHeader.jsx';
import photo from '../../assets/img/fried-rice.jpg';
import Search from '../partials/Search.jsx';
import Pagination from '../partials/Pagination.jsx';

/**
 * MyMeals class declaration
 *
 * @class MyMeals
 *
 * @extends {React.Component}
 */
class MyMeals extends React.Component {
  /**
   * Renders MyMeals component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    return (
      <div className='container'>
        <CatererHeader/>
        <div className='wrapper'>
          <Search/>
              <table>
                <tbody>
                <tr>
                  <th>Meal Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
                <tr>
                  <td>Egusi Soup</td>
                  <td><img src={photo} width='60' height='50' /></td>
                  <td>2500</td>
                  <td>
                    <button className='button warning' style={{ marginRight: '5px' }}>
                     <Link to='/edit-meal/1'> Modify </Link>
                    </button>
                    <button className='button danger'>Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Fried Rice</td>
                  <td><img src={photo} width='60' height='50'/></td>
                  <td>2500</td>
                  <td>
                    <button className='button warning' style={{ marginRight: '5px' }}>
                      <Link to='/edit-meal/1'> Modify </Link>
                    </button>
                    <button className='button danger'>Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Chicken Laps</td>
                  <td><img src={photo} width='60' height='50'/></td>
                  <td>2500</td>
                  <td>
                    <button className='button warning' style={{ marginRight: '5px' }}>
                      <Link to='/edit-meal/1'> Modify </Link>
                    </button>
                    <button className='button danger'>Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Ofada Rice</td>
                  <td><img src={photo} width='60' height='50'/></td>
                  <td>2500</td>
                  <td>
                    <button className='button warning'style={{ marginRight: '5px' }}>
                      <Link to='/edit-meal/1'> Modify </Link>
                    </button>
                    <button className='button danger'>Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Plantain Chips</td>
                  <td><img src={photo} width='60' height='50'/></td>
                  <td>2500</td>
                  <td>
                    <button className='button warning' style={{ marginRight: '5px' }}>
                      <Link to='/edit-meal/1'> Modify </Link>
                    </button>
                    <button className='button danger'>Delete</button>
                  </td>
                </tr>
                <tr>
                  <td>Ogbono Soup</td>
                  <td><img src={photo} width='60' height='50'/></td>
                  <td>2500</td>
                  <td>
                    <button className='button warning' style={{ marginRight: '5px' }}>
                      <Link to='/edit-meal/1'> Modify </Link>
                    </button>
                    <button className='button danger'>Delete</button>
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

export default MyMeals;
