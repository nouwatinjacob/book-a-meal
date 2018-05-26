import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import loginReducer from './reducers/loginReducer';

const enhancers = [];
let middleware = {};
if (process.env.NODE_ENV === 'development') {
  if (window.devToolsExtension) {
    enhancers.push(devToolsExtension());
  }
  middleware = applyMiddleware(logger, thunk);
} else {
  middleware = applyMiddleware(thunk);
}
const store = createStore(loginReducer, {}, compose(middleware, ...enhancers));

export default store;