import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { signin } from '../../../web/src/actions/user';
import { BASE_URL } from '../../../web/src/const';
import { SIGNING_IN_USER, SIGNIN_SUCCESSFUL, INITIAL_USER_STATE } from '../../../web/src/actions/type';

const mockStore = configureStore([thunk]);

describe('user action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should signin user', (done) => {
    moxios.stubRequest(`${BASE_URL}/user/signin`, {
      status: 200,
      response: { data: {} }
    });


    const expectedAction = [
      { type: SIGNING_IN_USER },
      {
        type: SIGNIN_SUCCESSFUL,
        user: null
      },
      { type: INITIAL_USER_STATE }];

    const store = mockStore();

    store.dispatch(signin()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
});
