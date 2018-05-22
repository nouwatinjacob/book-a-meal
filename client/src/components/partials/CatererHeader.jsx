import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class CatererHeader extends React.Component {
  render() {
    return (
      <div className='topnav'>
        <div className='wrapper'>
          <Link to='/'>Logout</Link>
          <NavLink activeClassName='active' to='/orders'>Orders</NavLink>
          <NavLink activeClassName='active' to='/set-menu'>Set Menu</NavLink>
          <NavLink activeClassName='active' to='/add-meal'>Add Meal</NavLink>
          <NavLink activeClassName='active' to='/my-meals'>My Menu</NavLink>
        </div>
      </div>
    );
  }
}

export default CatererHeader;
