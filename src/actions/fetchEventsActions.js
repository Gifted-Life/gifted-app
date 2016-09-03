import axios from 'axios';
import * as types from './actionTypes.js';

// TODO
// Update URL with correct url
// Client side hashing?

// Login
export function requestUserInfoAction() {
  return {
    type: types.FETCH_USER_INFO_REQUEST,
  };
}

export function receiveUserInfoAction(events) {
  return {
    type: types.FETCH_USER_INFO_SUCCESS,
    events,
  };
}

export function failureUserInfoAction() {
  return {
    type: types.FETCH_USER_INFO_FAILURE,
  };
}

export function fetchUserInfoAction(email, password) {
  return function (dispatch) {
    dispatch(requestUserInfoAction);
    return axios.post('/user/login', { email, password })
      .then((response) => {
        dispatch(receiveUserInfoAction(response.events));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(failureUserInfoAction());
        } else {
          throw new Error('Error: ', error.message);
        }
      });
  };
}
