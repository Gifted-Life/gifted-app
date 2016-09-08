import { combineReducers } from 'redux';
import testReducer from './testReducer';
import userStateReducer from './userStateReducer.js';
import eventsReducer from './eventsReducer.js';

const reducers = combineReducers({
  testReducer,
  userState: userStateReducer,
  events: eventsReducer,
});

export default reducers;
