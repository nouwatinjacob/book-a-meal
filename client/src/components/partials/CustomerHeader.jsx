import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class CustomerHeader extends React.Component {
  render() {
    return (
      <div className='topnav'>
        <a href='index.html'>Logout</a>
        <a href='user-order.html'>Cart</a>
        <a href='#'>My Orders</a>
        <a href='#'>My Account</a>
      </div>
    );
  }
}

export default CustomerHeader;
