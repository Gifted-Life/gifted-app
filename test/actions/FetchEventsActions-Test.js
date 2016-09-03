import { expect } from 'chai';
import { 
  requestUserInfoAction,
  receiveUserInfoAction,
  failureUserInfoAction,
  fetchUserInfoAction,
} from './../../src/actions/fetchEventsActions.js';
import * as types from './../../src/actions/actionTypes.js';

describe('Fetch Events Actions', () => {

  it('should create an action to request user information', () => {
    const expectedAction = {
      type: types.FETCH_USER_INFO_REQUEST,
    };
    expect(requestUserInfoAction()).to.eql(expectedAction);
  });

  it('should create an action to indicate user information was received', () => {
    const userEvents = [{ myEvt: 'party' }, { mySecondEvt: 'birthday' }];
    const expectedAction = {
      type: types.FETCH_USER_INFO_SUCCESS,
      events: userEvents,
    };
    expect(receiveUserInfoAction(userEvents)).to.eql(expectedAction);
  });

  it('should create an action to indicate failure of user information request', () => {
    const expectedAction = {
      type: types.FETCH_USER_INFO_FAILURE,
    };
    expect(failureUserInfoAction()).to.eql(expectedAction);
  });

  xit('should create a function to fetch user information', () => {

  });
});