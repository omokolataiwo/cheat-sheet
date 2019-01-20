import user from '../../../web/src/reducers/user';
import {
  INITIAL_USER_STATE,
  SIGNIN_SUCCESSFUL,
  SIGNUP_SUCCESSFUL,
  SIGNUP_FAILED,
  SIGNOUT_SUCCESSFULLY
} from '../../../web/src/actions/type';

const userData = { id: 1, token: '83jkdhdh2kjhjk' };

describe('user Reducer', () => {
  it('should return default state', () => {
    expect(user(undefined, {})).toEqual({ errors: {}, type: INITIAL_USER_STATE, user: {} });
  });
  it('should return sign in user state', () => {
    expect(user(undefined, { type: SIGNIN_SUCCESSFUL, user: userData })).toEqual({
      errors: {},
      type: SIGNIN_SUCCESSFUL,
      user: { id: 1, token: '83jkdhdh2kjhjk' }
    });
  });
  it('should return sign up user state', () => {
    expect(user(undefined, { type: SIGNUP_SUCCESSFUL, user: userData })).toEqual({
      errors: {},
      type: SIGNUP_SUCCESSFUL,
      user: { id: 1, token: '83jkdhdh2kjhjk' }
    });
  });
  it('should return failed sign up state', () => {
    expect(user(undefined, { type: SIGNUP_FAILED }))
      .toEqual({ errors: {}, type: SIGNUP_FAILED, user: {} });
  });
  it('should return sign out state', () => {
    expect(user(undefined, { type: SIGNOUT_SUCCESSFULLY }))
      .toEqual({ errors: {}, type: SIGNOUT_SUCCESSFULLY, user: {} });
  });
});
