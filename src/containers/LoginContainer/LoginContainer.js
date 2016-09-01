import React from 'react';
import FormInput from './../../components/FormInputs/FormInput.js';
import RectangleButton from './../../components/RectangleButton/RectangleButton.js';
import ErrorMessage from './../../components/ErrorMessage/ErrorMessage.js';
import { emailInputAction, passwordInputAction } from './../../actions/loginActions.js';
import store from './../../store.js';

// TODO
// Make AJAX call to the server with email and password
// Dispatch success or error action after AJAX to display error message
// Should make purely presentational component and pass down these 4 fns as props?

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);
    this.updateUserEmail = this.updateUserEmail.bind(this);
    this.updateUserPassword = this.updateUserPassword.bind(this);
    this.submitForm = this.submitForm.bind(this);
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

  submitForm(e) {
    e.preventDefault();
    console.log('make request to the server');
  }

  displayErrorMessage() {
    return store.getState().userState.correctLoginEmailAndPw ? '' :
      (<ErrorMessage
        errorMsgID='loginError'
        errorMsgText='Incorrect email address or password'
      />);
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
