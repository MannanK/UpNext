import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import "./assets/css/master.scss";
import configureStore from './store/store';
// We will use this to parse the user's session token
import jwt_decode from 'jwt-decode';
// The session utility we just created
import { setAuthToken } from './util/session_api_util';
// We have not created this action yet, but will do so in the next step
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {

    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);

    // Decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);

    // Create a preconfigured state we can immediately add to our store
    const preloadedState = { session: { isAuthenticated: true, user: decodedUser } };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    // If the user's token has expired
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page
      store.dispatch(logout());
      window.location.href = '/';
    }
  } else {
    store = configureStore({});
  }

  //remove these, for testing only
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});