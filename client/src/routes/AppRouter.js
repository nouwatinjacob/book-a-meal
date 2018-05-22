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

const AppRouter = () => (
  <BrowserRouter>
    <div>
    <Switch>
      <Route path='/' component={HomePage} exact={true}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={CustomerSignup}/>
      <Route path='/caterer-signup' component={CatererSignup}/>
      <Route path='/user-menus' component={MenuMeal}/>
      <Route path='/confirm-order' component={Confirmorder}/>
      <Route path='/modify-order' component={ModifyOrder}/>
      <Route path='*' component={PageNotFound}/>
    </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
