import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
// import AppRouter from './routes/AppRouter';
import './assets/css/compiled.css';
import App from './components/App.jsx';
import axiosInterceptor from './utils/axiosInterceptor';

axiosInterceptor.responseInterceptors(store);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
