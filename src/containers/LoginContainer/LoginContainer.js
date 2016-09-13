import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from './../../components/Login/Login.js';
import * as loginActions from './../../actions/loginActions.js';
import * as impureActions from './../../actions/impureActions.js';

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);
    this.updateUserEmail = this.updateUserEmail.bind(this);
    this.updateUserPassword = this.updateUserPassword.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
    this.displayErrorMessage = this.displayErrorMessage.bind(this);
  }

  updateUserEmail(event) {
    const inputValue = event.target.value;
    this.props.loginActions.emailInputAction(inputValue);
  }

  updateUserPassword(event) {
    const inputValue = event.target.value;
    this.props.loginActions.passwordInputAction(inputValue);
  }

  submitLoginForm(e) {
    e.preventDefault();
    this.props.impureActions.submitLoginAction(this.props.userState.email, this.props.userState.password);
  }

  displayErrorMessage() {
    if (this.props.events.errorFetching) {
      return {
        errorMsgID: 'loginError',
        errorMsgText: 'Incorrect email address or password',
      };
    } else if (this.props.userState.emptyLoginField) {
      return {
        errorMsgID: 'emptyLoginInputError',
        errorMsgText: 'All fields are required',
      };
    }
    return {
      errorMsgID: 'noError',
      errorMsgText: '',
    };
  }

  render() {
    const loginFunctions = {
      updateUserEmail: this.updateUserEmail,
      updateUserPassword: this.updateUserPassword,
      submitLoginForm: this.submitLoginForm,
    };

    const error = this.displayErrorMessage();

    return (
      <div>
        <Login loginFunctions={loginFunctions} errorMessage={error} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userState: state.userState,
    events: state.events,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginActions: bindActionCreators(loginActions, dispatch),
    impureActions: bindActionCreators(impureActions, dispatch),
  };
}

LoginContainer.propTypes = {
  loginActions: PropTypes.object,
  impureActions: PropTypes.object,
  userState: PropTypes.object,
  events: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
