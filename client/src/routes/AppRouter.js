import React from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import HomePage from '../components/Homepage.jsx';
import Login from '../components/auth/Signin.jsx';
import CustomerSignup from '../components/auth/CustomerSignup.jsx';
import CatererSignup from '../components/auth/CatererSignup.jsx';
import PageNotFound from '../components/PageNotfound.jsx';
import MenuMeal from '../components/customer/MenuMeal.jsx';
import Confirmorder from '../components/customer/ConfirmOrder.jsx';
import ModifyOrder from '../components/customer/ModifyOrder.jsx';
import UserOrder from '../components/customer/UserOrders.jsx';
import MyMeals from '../components/caterer/MyMeals.jsx';
import Orders from '../components/caterer/Orders.jsx';
import OrderDetail from '../components/caterer/OrderDetail.jsx';
import AddMeal from '../components/caterer/AddMeal.jsx';
import SetMenu from '../components/caterer/SetMenu.jsx';
import EditMeal from '../components/caterer/EditMeal.jsx';
import App from '../components/App.jsx';

const AppRouter = () => (
  <BrowserRouter>
    <div>
    <Switch>
      <App>
        <Route path='/' component={HomePage} exact={true}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={CustomerSignup}/>
        <Route path='/caterer-signup' component={CatererSignup}/>
        <Route path='/user-menus' component={MenuMeal}/>
        <Route path='/confirm-order' component={Confirmorder}/>
        <Route path='/modify-order/:orderId' component={ModifyOrder}/>
        <Route path='/user-order' component={UserOrder}/>
        <Route path='/my-meals' component={MyMeals}/>
        <Route path='/orders' component={Orders}/>
        <Route path='/order-detail' component={OrderDetail}/>
        <Route path='/add-meal' component={AddMeal}/>
        <Route path='/edit-meal/:mealId' component={EditMeal}/>
        <Route path='/set-menu' component={SetMenu}/>
      </App>
      <Route path='*' component={PageNotFound}/>
    </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
