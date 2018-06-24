import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutAction } from '../../actions/loginAction';

/**
 * CustomerHeader class declaration
 *
 * @class CustomerHeader
 *
 * @extends {React.Component}
 */
class CustomerHeader extends React.Component {
  handleLogout = () => {
    this.props.logoutAction();
  }
  /**
   * Renders CustomerHeader component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    return (
      <div className='topnav'>
        <div className='wrapper'>
          <a
            onClick={this.handleLogout}
          >
            Logout
          </a>
          
          <NavLink activeClassName='active' to='/user-order'>My Orders</NavLink>
          <NavLink activeClassName='active' to='#'>My Account</NavLink>
        </div>
      </div>
    );
  }
}

CustomerHeader.propTypes = {
  logoutAction: PropTypes.func
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logoutAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHeader);
