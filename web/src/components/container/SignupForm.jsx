import React from 'react';
import propTypes from 'prop-types';
import TextInputField from './TextInputField';

const SignupForm = ({
  user: {
    firstName, lastName, username, password
  },
  onSignup,
  errors,
  onFormFieldChange
}) => (
  <React.Fragment>
    <h3>Sign up</h3>
    <form onSubmit={onSignup}>
      <TextInputField
        name="firstName"
        placeholder="First name"
        type="text"
        size="3"
        onChange={onFormFieldChange}
        value={firstName}
        errors={errors.firstName}
      />
      <TextInputField
        name="lastName"
        placeholder="Last name"
        type="text"
        size="3"
        onChange={onFormFieldChange}
        value={lastName}
        errors={errors.lastName}
      />
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
      <button type="submit" className="btn right">
        Create Account
      </button>
    </form>
  </React.Fragment>
);

SignupForm.propTypes = {
  user: propTypes.shape({
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired
  }).isRequired,
  onSignin: propTypes.func.isRequired,
  onFormFieldChange: propTypes.func.isRequired
};

export default SignupForm;
