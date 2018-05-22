import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header.jsx';
import CatererHeader from '../partials/CatererHeader.jsx';
import photo from '../../assets/img/fried-rice.jpg';
import Search from '../partials/Search.jsx';
import Pagination from '../partials/Pagination.jsx';

class MyMeals extends React.Component {
  render() {
    return (
      <div className='container'>

        <Header/>
        <CatererHeader/>
        <div className='wrapper'>
          <Search/>
              <table>
                <tr>
                  <th>Meal Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
                <tr>
                  <td>Egusi Soup</td>
                  <td><img src={ photo } width='60' height='50' /></td>
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
                  <td><img src={ photo } width='60' height='50'/></td>
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
                  <td><img src={ photo } width='60' height='50'/></td>
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
                  <td><img src={ photo } width='60' height='50'/></td>
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
                  <td><img src={ photo } width='60' height='50'/></td>
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
                  <td><img src={ photo } width='60' height='50'/></td>
                  <td>2500</td>
                  <td>
                    <button className='button warning' style={{ marginRight: '5px' }}>
                      <Link to='/edit-meal/1'> Modify </Link>
                    </button>
                    <button className='button danger'>Delete</button>
                  </td>
                </tr>
              </table>
        </div><br/>
        <Pagination/><br/>
      </div>
    );
  }
}

export default MyMeals;
