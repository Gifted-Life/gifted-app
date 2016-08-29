import { combineReducers } from 'redux';
import testReducer from './testReducer';
import userStateReducer from './userStateReducer.js';

const reducers = combineReducers({
  testReducer,
  userState: userStateReducer,
});

export default reducers;
