import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * CustomerHeader class declaration
 *
 * @class CustomerHeader
 *
 * @extends {React.Component}
 */
class CustomerHeader extends React.Component {
  /**
   * Renders CustomerHeader component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    return (
      <div className='topnav'>
        <div className='wrapper'>
          <NavLink activeClassName='active' to='/user-order'>My Orders</NavLink>
          <NavLink activeClassName='active' to='/menus'>Menu</NavLink>
        </div>
      </div>
    );
  }
}

export default CustomerHeader;
