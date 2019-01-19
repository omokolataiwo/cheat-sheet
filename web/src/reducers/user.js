import {
  SIGNING_IN_USER, INITIAL_USER_STATE, SIGNIN_SUCCESSFUL, SIGNOUT_SUCCESSFULLY, SIGNUP_SUCCESSFUL, SIGNIN_FAILED
} from '../actions/type';

const initialState = {
  type: INITIAL_USER_STATE,
  user: {},
  errors: {}
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESSFUL:
    case SIGNUP_SUCCESSFUL:
      return { ...state, type: action.type, user: action.user };
    case SIGNIN_FAILED:
      return { ...state, type: action.type, errors: { ...state.errors, ...action.error } };
    case SIGNING_IN_USER:
    case SIGNOUT_SUCCESSFULLY:
    case INITIAL_USER_STATE:
      return { ...state, type: action.type };
    default:
      return state;
  }
};

export default user;
