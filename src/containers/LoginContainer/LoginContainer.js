import React from 'react';
import FormInput from './../../components/FormInputs/FormInput.js';
import RectangleButton from './../../components/RectangleButton/RectangleButton.js';
import ErrorMessage from './../../components/ErrorMessage/ErrorMessage.js';
import { emailInputAction, passwordInputAction, submitLoginAction } from './../../actions/loginActions.js';
import store from './../../store.js';

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
    store.dispatch(emailInputAction(inputValue));
  }

  updateUserPassword(event) {
    const inputValue = event.target.value;
    store.dispatch(passwordInputAction(inputValue));
  }

  submitLoginForm(e) {
    e.preventDefault();
    console.log('make request to the server');
    store.dispatch(submitLoginAction());
  }

  displayErrorMessage() {
    if (store.getState().events.errorFetching) {
      return (<ErrorMessage
        errorMsgID='loginError'
        errorMsgText='Incorrect email address or password'
      />);
    } else if (store.getState().userState.emptyLoginField) {
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

export default LoginContainer;
