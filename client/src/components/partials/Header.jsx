import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { decodeToken } from '../../utils/helper';
import logo from '../../assets/img/bookameal-logo.png';


/**
 * Header class declaration
 *
 * @class Header
 *
 * @extends {React.Component}
 */
class Header extends React.Component {
  /**
   * Renders Header component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    return (
      <div className='header'>
        <div className='wrapper'>
          <Link to='/'>
            <img 
            src='http://res.cloudinary.com/sansaristic/image/upload/v1533140463/BookMeal/Default%20images/bookameal-logo.png' 
            alt='Logo' />
          </Link>
          {
            localStorage.getItem('token') ? 
            <div className='header-right' id='myTopnav'>
              <Link className='logo' to=''>WELCOME &nbsp; 
              {
                decodeToken(localStorage.getItem('token')).email
              }
              </Link>
            </div>
          : 
            <div className='header-right' id='myTopnav'>
            <Link className='logo' to='/login'>SIGN IN</Link>
            <button className='button' id='header_button'>
              <Link to='/signup'>CREATE ACCOUNT</Link>
            </button>
          </div>
          }
        </div>
    </div>
    );
  }
}

export default withRouter(Header);
