import jwt_decode from 'jwt-decode';
import history from './history';
// import { browserHistory } from 'react-router';

/**
 * @description decodes token
 *
 *@function decodeToken
 *
 * @param {string} token
 *
 * @return {void} void
 */
const decodeToken = token => jwt_decode(token);

/**
 * @description redirects users to appropriate page
 *
 *@function reDirect
 *
 * @param {string} token
 *
 * @return {void} void
 */
const reDirect = (token) => {
  const decodedToken = jwt_decode(token);
  if (!decodedToken.userType === 'caterer') {
    history.push('/my-meals');
  } else {
    history.push('/menus');
  }
};

/**
 * @description log users out
 *
 *@function logout
 *
 * @param {void} void
 *
 * @return {void} void
 */
const logout = () => {
  window.localStorage.removeItem('token');
  browserHistory.push('/');
};

export {
  decodeToken,
  reDirect,
  logout
}; 