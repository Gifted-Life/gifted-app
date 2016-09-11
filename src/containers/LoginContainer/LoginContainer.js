import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormInput from './../../components/FormInputs/FormInput.js';
import RectangleButton from './../../components/RectangleButton/RectangleButton.js';
import ErrorMessage from './../../components/ErrorMessage/ErrorMessage.js';
import * as loginActions from './../../actions/loginActions.js';
import * as impureActions from './../../actions/impureActions.js';

// TODO
// Should make purely presentational component and pass down these 4 fns as props?

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
    console.log('submit form');
    this.props.impureActions.submitLoginAction(this.props.userState.email, this.props.userState.password);
  }

  displayErrorMessage() {
    if (this.props.events.errorFetching) {
      return (<ErrorMessage
        errorMsgID='loginError'
        errorMsgText='Incorrect email address or password'
      />);
    } else if (this.props.userState.emptyLoginField) {
      return (<ErrorMessage
        errorMsgID='emptyLoginInputError'
        errorMsgText='All fields are required'
      />);
    }
    return '';
  }

  render() {

    let errorMessage = this.displayErrorMessage();
    
    return (
      <div>
        <h1>Login</h1>
        {errorMessage}
        <form>
          <FormInput
            inputType='email'
            inputID='loginEmailInput'
            labelText='Email Address'
            handleChangeFn={this.updateUserEmail}
          />
          <FormInput
            inputType='password'
            inputID='loginPasswordInput'
            labelText='Password'
            handleChangeFn={this.updateUserPassword}
          />
          <RectangleButton
            text='Log In'
            type='submit'
            handleClick={this.submitLoginForm}
          />
        </form>
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
