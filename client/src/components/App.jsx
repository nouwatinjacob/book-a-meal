import React from 'react';
import { Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import history from '../utils/history';
import Header from './partials/Header.jsx';
import Footer from './partials/Footer.jsx';
import HomePage from './Homepage.jsx';
import Login from './auth/Signin.jsx';
import CustomerSignup from './auth/CustomerSignup.jsx';
import CatererSignup from './auth/CatererSignup.jsx';
import PageNotFound from './PageNotfound.jsx';
import MenuMeal from './customer/MenuMeal.jsx';
import ConfirmOrder from './customer/ConfirmOrder.jsx';
import ModifyOrder from './customer/ModifyOrder.jsx';
import UserOrder from './customer/UserOrders.jsx';
import MyMeals from './caterer/MyMeals.jsx';
import Orders from './caterer/Orders.jsx';
import OrderDetail from './caterer/OrderDetail.jsx';
import AddMeal from './caterer/AddMeal.jsx';
import SetMenu from './caterer/SetMenu.jsx';
import EditMeal from './caterer/EditMeal.jsx';

import PrivateRoute from '../route-type/PrivateRoute.jsx';
import PublicRoute from '../route-type/PublicRoute.jsx';


/**
 * App class declaration
 *
 * @class App
 *
 * @extends {React.Component}
 */
class App extends React.Component {
  /**
   * Component constructor
   * @param {object} props
   * @memberOf App
   */
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      console.log(`The current URL is 
      ${location.pathname}${location.search}${location.hash}`);
      console.log(`The last navigation action was ${action}`);
    });
  }

  /**
   * Renders Login component
   *
   * @returns {XML} XML/JSX
   */
  render() {
    return (
       <div>
         <Router history={history}>
          <div id='holder'>
            <Header/>
            <Switch>
              <Route path='/' component={HomePage} exact={true}/>
              <PublicRoute exact path='/login' component={Login}/>
              <PublicRoute exact path='/signup' component={CustomerSignup}/>
              <PublicRoute 
                exact 
                path='/caterer-signup'
                component={CatererSignup}
              />
              <PrivateRoute path='/menus' component={MenuMeal}/>
              <PrivateRoute path='/confirm-order' component={ConfirmOrder}/>
              <PrivateRoute
                path='/modify-order/:orderId'
                component={ModifyOrder}
              />
              <PrivateRoute path='/user-order' component={UserOrder}/>
              <PrivateRoute path='/caterer' component={MyMeals}/>
              <PrivateRoute path='/orders' component={Orders}/>
              <PrivateRoute
                path='/order-detail/:orderId'
                component={OrderDetail}
              />
              <PrivateRoute path='/add-meal' component={AddMeal}/>
              <PrivateRoute path='/edit-meal/:mealId' component={EditMeal}/>
              <PrivateRoute path='/set-menu' component={SetMenu}/>
              <PrivateRoute exact path='/' component={HomePage}/>
              <Route path="*" component={PageNotFound}/>
            </Switch>
            <Footer/>
          </div>
          </Router>
        </div>
    );
  }
}

export default App;

