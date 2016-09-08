import axios from 'axios';
import { requestUserInfoAction, receiveUserInfoAction, failureUserInfoAction } from './fetchEventsActions.js';
import { emptyLoginFieldAction } from './loginActions.js';

axios.defaults.adapter = require('axios/lib/adapters/http');

// TODO
// Update URL with correct url
// Client side hashing?

export function fetchUserInfoAction(email, password) {
  return function (dispatch) {
    dispatch(requestUserInfoAction());
    return axios.post('http://FAKEURL/user/login', { email, password })
      .then((response) => {
        dispatch(receiveUserInfoAction(response.data.events));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(failureUserInfoAction());
        } else {
          throw new Error('Error preparing ajax request');
        }
      });
  };
}

export function submitLoginAction() {
  return function (dispatch, getState) {
    const email = getState().userState.email;
    const password = getState().userState.password;
    if (email && password) {
      dispatch(fetchUserInfoAction(email, password));
    } else {
      dispatch(emptyLoginFieldAction());
    }
    return;
  };
}
