import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { signin, signup, logout } from '../../../web/src/actions/user';
import { BASE_URL } from '../../../web/src/const';
import {
  SIGNING_IN_USER,
  SIGNIN_SUCCESSFUL,
  INITIAL_USER_STATE,
  SIGNING_UP_USER,
  SIGNUP_SUCCESSFUL,
  SIGNOUT_SUCCESSFULLY,
  SIGNIN_FAILED,
  SIGNUP_FAILED
} from '../../../web/src/actions/type';

const mockStore = configureStore([thunk]);

describe('user action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should signin user', (done) => {
    moxios.stubRequest(`${BASE_URL}/user/signin`, {
      status: 200,
      response: {
        data: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzM4OTFkMTBiYzA1ZTE5NTc5YjRhZjYiLCJ1c2VybmFtZSI6Im9tb2tvbGF0YWl3bzMyMSIsIl9fdiI6MCwiaWF0IjoxNTQ3NDA5MjU1LCJleHAiOjE1NDc0MTI4NTV9.NjshNKcb0iQL_y8b7KDJ93iXcxdou3fIjKsu0UUHmJc'
        }
      }
    });

    const expectedAction = [
      { type: SIGNING_IN_USER },
      {
        type: SIGNIN_SUCCESSFUL,
        user: {
          __v: 0,
          _id: '5c3891d10bc05e19579b4af6',
          exp: 1547412855,
          iat: 1547409255,
          username: 'omokolataiwo321'
        }
      },
      { type: INITIAL_USER_STATE }
    ];

    const store = mockStore();

    store.dispatch(signin()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  it('should signup user', (done) => {
    moxios.stubRequest(`${BASE_URL}/user/`, {
      status: 200,
      response: {
        data: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzM4OTFkMTBiYzA1ZTE5NTc5YjRhZjYiLCJ1c2VybmFtZSI6Im9tb2tvbGF0YWl3bzMyMSIsIl9fdiI6MCwiaWF0IjoxNTQ3NDA5MjU1LCJleHAiOjE1NDc0MTI4NTV9.NjshNKcb0iQL_y8b7KDJ93iXcxdou3fIjKsu0UUHmJc'
        }
      }
    });

    const expectedAction = [
      { type: SIGNING_UP_USER },
      {
        type: SIGNUP_SUCCESSFUL,
        user: {
          __v: 0, _id: '5c3891d10bc05e19579b4af6', exp: 1547412855, iat: 1547409255, username: 'omokolataiwo321'
        }
      }, { type: INITIAL_USER_STATE }];

    const store = mockStore();

    store.dispatch(signup()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  it('should logout user', (done) => {
    const expectedAction = { type: SIGNOUT_SUCCESSFULLY };
    const store = mockStore();
    expect(store.dispatch(logout())).toEqual(expectedAction);
    done();
  });

  it('should create sign in error action', (done) => {
    moxios.stubRequest(`${BASE_URL}/user/signin`, {
      status: 400,
      response: { data: {} }
    });

    const expectedAction = [{ type: SIGNING_IN_USER }, { error: undefined, type: SIGNIN_FAILED }];

    const store = mockStore();

    store.dispatch(signin()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });

  it('should create sign up error action', (done) => {
    moxios.stubRequest(`${BASE_URL}/user/`, {
      status: 400,
      response: { data: {} }
    });

    const expectedAction = [{ type: SIGNING_UP_USER }, { error: undefined, type: SIGNUP_FAILED }];

    const store = mockStore();

    store.dispatch(signup()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
});
