import { expect } from 'chai';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { fetchUserInfoAction, submitLoginAction } from './../../src/actions/impureActions.js';
import * as types from './../../src/actions/actionTypes.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Impure Actions', () => {
  describe('Fetch User Info Action', () => {

    const testURL = 'http://FAKEURL';
    afterEach(() => {
      nock.cleanAll();
    });

    it('should dispatch fetch user input success when login is successful', () => {
      const testEvents = [{ myEvent: 'party' }, { secondEvt: 'birthday' }];
      nock(testURL)
        // .log(console.log)
        .post('/user/login')
        .reply(200, { events: testEvents });

      const expectedActions = [
        { type: types.FETCH_USER_INFO_REQUEST },
        { type: types.FETCH_USER_INFO_SUCCESS, events: testEvents },
      ];
      const store = mockStore({});

      return store.dispatch(fetchUserInfoAction('hello@hi.com', 'hola'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });

    it('should dispatch fetch user input failure when login failed', () => {
      nock(testURL)
        // .log(console.log)
        .post('/user/login')
        .reply(400, 'Incorrect username or password');

      const expectedActions = [
        { type: types.FETCH_USER_INFO_REQUEST },
        { type: types.FETCH_USER_INFO_FAILURE },
      ];
      const store = mockStore({});

      return store.dispatch(fetchUserInfoAction('nope@hi.com', 'wrong'))
        .then(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
  });

  describe('Submit Login Action', () => {

    it('should dispatch empty login field action if empty email field', () => {
      const expectedAction = [{ type: types.EMPTY_LOGIN_FIELD }];
      const store = mockStore({});
      const email = '';
      const password = 'hola';

      store.dispatch(submitLoginAction(email, password));
      expect(store.getActions()).to.eql(expectedAction);
    });

    it('should dispatch empty login field action if empty password field', () => {
      const expectedAction = [{ type: types.EMPTY_LOGIN_FIELD }];
      const store = mockStore({});
      const email = 'hello@hi.com';
      const password = '';

      store.dispatch(submitLoginAction(email, password));
      expect(store.getActions()).to.eql(expectedAction);
    });

    it('should dispatch empty login field action if empty email and password fields', () => {
      const expectedAction = [{ type: types.EMPTY_LOGIN_FIELD }];
      const store = mockStore({});
      const email = '';
      const password = '';

      store.dispatch(submitLoginAction(email, password));
      expect(store.getActions()).to.eql(expectedAction);
    });

    it('should dispatch fetch user info action if email and password fields are filled out', () => {
      // When fetch user info action is dispatched, it returns a function that first initiates the
      // fetching process. This test is testing whether 'fetch user info action' was dispatched, 
      // by looking for the 'fetch user info request' action that is dispatched from of it.
      const expectedAction = [{ type: types.FETCH_USER_INFO_REQUEST }];
      const store = mockStore({});
      const email = 'hello@hi.com';
      const password = 'hola';

      store.dispatch(submitLoginAction(email, password));
      expect(store.getActions()).to.eql(expectedAction);
    });
  });
});
