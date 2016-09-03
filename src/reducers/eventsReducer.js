import * as types from './../actions/actionTypes';

const initialState = {
  isFetching: false,
  errorFetching: false,
  events: [],
};

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER_INFO_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case types.FETCH_USER_INFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorFetching: false,
        events: action.events,
      });
    case types.FETCH_USER_INFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorFetching: true,
      });
    default:
      return state;
  }
}

export default eventsReducer;
