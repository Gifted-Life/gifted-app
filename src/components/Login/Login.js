import React, { PropTypes } from 'react';
import FormInput from './../FormInputs/FormInput.js';
import RectangleButton from './../RectangleButton/RectangleButton.js';
import ErrorMessage from './../ErrorMessage/ErrorMessage.js';

const Login = ({ loginFunctions, errorMessage }) => {

  const { updateUserEmail, updateUserPassword, submitLoginForm } = loginFunctions;
  const { errorMsgID, errorMsgText } = errorMessage;

  return (
    <div>
      <h1>Login</h1>
      <ErrorMessage
        errorMsgID={errorMsgID}
        errorMsgText={errorMsgText}
      />
      <form>
        <FormInput
          inputType='email'
          inputID='loginEmailInput'
          labelText='Email Address'
          handleChangeFn={updateUserEmail}
        />
        <FormInput
          inputType='password'
          inputID='loginPasswordInput'
          labelText='Password'
          handleChangeFn={updateUserPassword}
        />
        <RectangleButton
          text='Log In'
          type='submit'
          handleClick={submitLoginForm}
        />
      </form>
    </div>
  );
};

Login.propTypes = {
  loginFunctions: PropTypes.object,
  errorMessage: PropTypes.object,
};

export default Login;
