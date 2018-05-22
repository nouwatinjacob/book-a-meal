import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class CustomerHeader extends React.Component {
  render() {
    return (
      <div className='topnav'>
        <div className='wrapper'>
          <Link to='/'>Logout</Link>
          <NavLink activeClassName='active' to='/confirm-order'>Cart</NavLink>
          <NavLink activeClassName='active' to='/user-order'>My Orders</NavLink>
          <NavLink activeClassName='active' to='#'>My Account</NavLink>
        </div>
      </div>
    );
  }
}

export default CustomerHeader;
