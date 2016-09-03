import * as types from './../actions/actionTypes.js';

const initialState = {
  email: '',
  password: '',
  emptyLoginField: false,
};

function userStateReducer(state = initialState, action) {
  switch (action.type) {
    case types.EMAIL_ADDRESS_INPUT:
      return Object.assign({}, state, { email: action.emailInput });
    case types.PASSWORD_INPUT:
      return Object.assign({}, state, { password: action.passwordInput });
    case (types.EMPTY_LOGIN_FIELD):
      return Object.assign({}, state, { emptyLoginField: true });
    default:
      return state;
  }
}

export default userStateReducer;
