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

  myFunction = () => {
    const x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  /**
   * Renders CatererHeader Component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    return (
      <div className='topnav' id="myTopnav">
        <div className='wrapper'>
          <a
            onClick={this.handleLogout}
          >
            Logout
          </a>
          <NavLink activeClassName='active' to='/user-order'>My Orders</NavLink>
          <NavLink
            activeClassName='active'
            to='/orders'
          >
            Orders History
          </NavLink>
          <NavLink activeClassName='active' to='/menus'>Menus</NavLink>
          <NavLink activeClassName='active' to='/set-menu'>Set Menu</NavLink>
          <NavLink activeClassName='active' to='/add-meal'>Add Meal</NavLink>
          <NavLink activeClassName='active' to='/caterer'>My Meals</NavLink>
          <a 
            href="javascript:void(0);"
            className="icon" 
            onClick={this.myFunction}
          >
            <i className="fa fa-bars"></i>
          </a>
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
