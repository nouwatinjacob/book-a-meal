import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutAction } from '../../actions/loginAction';

/**
 * CatererHeader class declaration
 *
 * @class CatererHeader
 *
 * @extends {React.Component}
 */
class CatererHeader extends React.Component {
  handleLogout = () => {
    this.props.logoutAction();
  }
  /**
   * Renders CatererHeader Component
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
          <NavLink activeClassName='active' to='/orders'>Orders</NavLink>
          <NavLink activeClassName='active' to='/set-menu'>Set Menu</NavLink>
          <NavLink activeClassName='active' to='/add-meal'>Add Meal</NavLink>
          <NavLink activeClassName='active' to='/caterer'>My Meals</NavLink>
        </div>
      </div>
    );
  }
}

CatererHeader.propTypes = {
  logoutAction: PropTypes.func
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logoutAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatererHeader);
