import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { decodeToken } from '../../utils/helper';
import { logoutAction } from '../../actions/loginAction';

/**
 * Header class declaration
 *
 * @class Header
 *
 * @extends {React.Component}
 */
class Header extends React.Component {
  handleLogout = () => {
    this.props.logoutAction();
  }
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
            src='https://res.cloudinary.com/sansaristic/image/upload/v1533140463/BookMeal/Default%20images/bookameal-logo.png'
            alt='Logo' />
          </Link>
          {
            this.props.isLoggedIn || this.props.isSignedup ?
            <div className='header-right' id='myTopnav'>
              <Link className='logo' to=''>WELCOME &nbsp;
              {
                decodeToken(localStorage.getItem('token')).email
              }
              </Link>
              <Link
                className='button logout'
                to='#'
                onClick={this.handleLogout}
              >logout</Link>
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
Header.propTypes = {
  logoutAction: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  isSignedup: PropTypes.bool
};

const mapStateToProps = state => ({
  isLoggedIn: state.loginReducer.success,
  isSignedup: state.signupReducer.success
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logoutAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
