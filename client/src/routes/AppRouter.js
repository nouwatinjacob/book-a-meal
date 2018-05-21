import React from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import HomePage from '../components/Homepage.jsx';
import Login from '../components/auth/Signin.jsx';
import CustomerSignup from '../components/auth/CustomerSignup.jsx';
import PageNotFound from '../components/PageNotfound.jsx';

const AppRouter = () => (
  <BrowserRouter>
    <div>
    <Switch>
      <Route path='/' component={HomePage} exact={true}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={CustomerSignup}/>
      <Route path='/caterer-signup' component={CustomerSignup}/>
      <Route component={PageNotFound}/>
    </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
