import React from 'react';
import { expect } from 'chai';
import eventsReducer from './../../src/reducers/eventsReducer.js';
import * as types from './../../src/actions/actionTypes.js';

describe('Events Reducer', () => {

  const initialState = {
    isFetching: false,
    errorFetching: false,
    events: [],
  };

  const userInfoRequestAction = {
    type: types.FETCH_USER_INFO_REQUEST,
  };

  const testEvents = [{ myEvent: 'birthday' }, { secondEvent: 'party' }];

  const userInfoRequestSuccessAction = {
    type: types.FETCH_USER_INFO_SUCCESS,
    events: testEvents,
  };

  const userInfoRequestFailureAction = {
    type: types.FETCH_USER_INFO_FAILURE,
  };

  it('should return the initial state', () => {
    expect(eventsReducer(undefined, {})).to.eql(initialState);
  });

  it('should handle user info request action', () => {
    expect(eventsReducer(undefined, userInfoRequestAction)).to.eql({
      isFetching: true,
      errorFetching: false,
      events: [],
    });

    const testState = {
      isFetching: false,
      errorFetching: true,
      events: [],
    };
    expect(eventsReducer(testState, userInfoRequestAction)).to.eql({
      isFetching: true,
      errorFetching: false,
      events: [],
    });
  });

  it('should handle user info received action', () => {
    expect(eventsReducer(undefined, userInfoRequestSuccessAction)).to.eql({
      isFetching: false,
      errorFetching: false,
      events: testEvents,
    });

    const testState = {
      isFetching: true,
      errorFetching: true,
      events: [],
    };
    expect(eventsReducer(testState, userInfoRequestSuccessAction)).to.eql({
      isFetching: false,
      errorFetching: false,
      events: testEvents,
    });
  });

  it('should handle user info request failure action', () => {
    expect(eventsReducer(undefined, userInfoRequestFailureAction)).to.eql({
      isFetching: false,
      errorFetching: true,
      events: [],
    });

    const testState = {
      isFetching: true,
      errorFetching: false,
      events: [],
    };
    expect(eventsReducer(testState, userInfoRequestFailureAction)).to.eql({
      isFetching: false,
      errorFetching: true,
      events: [],
    });
  });
});

