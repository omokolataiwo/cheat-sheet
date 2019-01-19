import jwt from 'jsonwebtoken';
import Axios from 'axios';
import { BASE_URL } from '../const';
import {
  SIGNING_IN_USER,
  SIGNIN_SUCCESSFUL,
  SIGNIN_FAILED,
  INITIAL_USER_STATE,
  SIGNOUT_SUCCESSFULLY,
  SIGNUP_SUCCESSFUL,
  SIGNUP_FAILED,
  SIGNING_UP_USER
} from './type';

const signupSuccessful = user => ({ type: SIGNUP_SUCCESSFUL, user });
const signupFailed = error => ({ type: SIGNUP_FAILED, error });

const signinSuccessful = user => ({ type: SIGNIN_SUCCESSFUL, user });
const signinFailed = error => ({ type: SIGNIN_FAILED, error });
const logoutSuccessfully = () => ({ type: SIGNOUT_SUCCESSFULLY });

const handleSuccessfulUserAuthRequest = (data, dispatch, actionCreator) => {
  const { token } = data;
  localStorage.setItem('token', token);
  dispatch(actionCreator(jwt.decode(token)));
  dispatch({ type: INITIAL_USER_STATE });
};

const handleFailedUserAuthRequest = (response, dispatch, actionCreator) => {
  const {
    data: { error }
  } = response;
  dispatch(actionCreator(error));
};

export const signin = user => (dispatch) => {
  dispatch({ type: SIGNING_IN_USER });
  return Axios.post(`${BASE_URL}/user/signin`, { ...user })
    .then(({ data: { data } }) => {
      handleSuccessfulUserAuthRequest(data, dispatch, signinSuccessful);
    })
    .catch(({ response }) => {
      handleFailedUserAuthRequest(response, dispatch, signinFailed);
    });
};

export const signup = user => (dispatch) => {
  dispatch({ type: SIGNING_UP_USER });
  return Axios.post(`${BASE_URL}/user/`, { ...user })
    .then(({ data: { data } }) => {
      handleSuccessfulUserAuthRequest(data, dispatch, signupSuccessful);
    })
    .catch(({ response }) => {
      handleFailedUserAuthRequest(response, dispatch, signupFailed);
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logoutSuccessfully());
  dispatch({ type: INITIAL_USER_STATE });
};

export const resetUserState = () => (dispatch) => {
  dispatch({ type: INITIAL_USER_STATE });
};
