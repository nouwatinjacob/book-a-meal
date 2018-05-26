import React from 'react';
import { Router, Route, Link, NavLink, Switch } from 'react-router-dom';
import history from '../utils/history';
import Header from './partials/Header.jsx';
import HomePage from './Homepage.jsx';
import Login from './auth/Signin.jsx';
import CustomerSignup from './auth/CustomerSignup.jsx';
import CatererSignup from './auth/CatererSignup.jsx';
import PageNotFound from './PageNotfound.jsx';
import MenuMeal from './customer/MenuMeal.jsx';
import Confirmorder from './customer/ConfirmOrder.jsx';
import ModifyOrder from './customer/ModifyOrder.jsx';
import UserOrder from './customer/UserOrders.jsx';
import MyMeals from './caterer/MyMeals.jsx';
import Orders from './caterer/Orders.jsx';
import OrderDetail from './caterer/OrderDetail.jsx';
import AddMeal from './caterer/AddMeal.jsx';
import SetMenu from './caterer/SetMenu.jsx';
import EditMeal from './caterer/EditMeal.jsx';


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
      console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`);
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
          <div>
            <Header/>
            <Switch>
              <Route path='/' component={HomePage} exact={true}/>
              <Route path='/login' component={Login}/>
              <Route path='/signup' component={CustomerSignup}/>
              <Route path='/caterer-signup' component={CatererSignup}/>
              <Route path='/menus' component={MenuMeal}/>
              <Route path='/confirm-order' component={Confirmorder}/>
              <Route path='/modify-order/:orderId' component={ModifyOrder}/>
              <Route path='/user-order' component={UserOrder}/>
              <Route path='/my-meals' component={MyMeals}/>
              <Route path='/orders' component={Orders}/>
              <Route path='/order-detail' component={OrderDetail}/>
              <Route path='/add-meal' component={AddMeal}/>
              <Route path='/edit-meal/:mealId' component={EditMeal}/>
              <Route path='/set-menu' component={SetMenu}/>
              <Route exact path='/' component={HomePage}/>
              <Route path="*" component={PageNotFound}/>
            </Switch>
          </div>
          </Router>
        </div>
    );
  }
}

export default App;

