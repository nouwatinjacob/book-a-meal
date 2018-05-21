import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/bookameal-logo.png';

const Header = () => (
  <div className='header'>
        <div className='wrapper'>
          <Link to='/'>
            <img src={ logo } alt='Logo' />
          </Link>
          <div className='header-right' id='myTopnav'>
            <Link className='logo' to='/login'>SIGN IN</Link>
            <button className='button' id='header_button'>
              <Link to='/signup'>CREATE ACCOUNT</Link>
            </button>
          </div>
        </div>
      </div>
);

export default Header;
