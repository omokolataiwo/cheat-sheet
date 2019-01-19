import React from 'react';
import propTypes from 'prop-types';
import TextInputField from './TextInputField';

const SigninForm = ({
  user: { username, password }, onSignin, onFormFieldChange, signInError, errors
}) => (
  <React.Fragment>
    <h3>Sign in</h3>
    {signInError
      && signInError.map(error => (
        <span key={new Date()} className="error">
          {error}
        </span>
      ))}
    <form onSubmit={onSignin}>
      <TextInputField
        name="username"
        placeholder="username"
        type="text"
        size="3"
        onChange={onFormFieldChange}
        value={username}
        errors={errors.username}
      />
      <TextInputField
        name="password"
        placeholder="password"
        type="password"
        size="3"
        onChange={onFormFieldChange}
        value={password}
        errors={errors.password}
      />
      <button type="submit" className="btn">
        Sign in
      </button>
    </form>
  </React.Fragment>
);

SigninForm.propTypes = {
  user: propTypes.shape({
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired
  }).isRequired,
  onSignin: propTypes.func.isRequired,
  onFormFieldChange: propTypes.func.isRequired
};

export default SigninForm;
