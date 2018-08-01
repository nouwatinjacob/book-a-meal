import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './assets/css/compiled.css';
import App from './components/App.jsx';
import axiosInterceptor from './utils/axiosInterceptor';

axiosInterceptor.requestInterceptors();
axiosInterceptor.responseInterceptors(store);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
