import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../../web/src/components/pages/Home';
import {
  INITIAL_USER_STATE,
  SIGNIN_SUCCESSFUL,
  SIGNUP_FAILED
} from '../../../web/src/actions/type';

const props = {
  history: { push: jest.fn(() => {}) },
  addToFavorite: jest.fn(() => {}),
  signin: jest.fn(() => {}),
  signup: jest.fn(() => {}),
  resetUserState: jest.fn(() => { }),
  searchSheetCheat: jest.fn(() => {}),
  user: { type: INITIAL_USER_STATE },
  cheat: {
    errors: {},
    categories: [
      { title: 'Installation', cheats: [{ description: 'Initialize a repo', line: 'git init' }] }
    ]
  }
};
const wrapper = shallow(<Home {...props} />);

describe('Home Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should add cheat id as favorite', () => {
    const instance = wrapper.instance();
    instance.addToFavorite(12);
    expect(props.addToFavorite).toHaveBeenCalledWith(12);
  });

  it('should update state on field change', () => {
    const instance = wrapper.instance();
    instance.formFieldChanged({ target: { value: 'Taiwo', name: 'firstName' } });
    expect(wrapper.state().user.firstName).toEqual('Taiwo');
  });

  it('should signin user', () => {
    wrapper.setState({
      user: {
        firstName: 'Taiwo',
        lastName: 'Kolawole',
        username: 'omokolataiwo@gmail.com',
        password: ''
      }
    });
    const instance = wrapper.instance();
    instance.signin({ preventDefault: () => {} });
    expect(wrapper.state().errors).toEqual({ signin: { password: ['Password is too short'] } });
    wrapper.setState(prevState => ({ user: { ...prevState.user, password: '3232djsd' } }));
    instance.signin({ preventDefault: () => {} });
    expect(props.signin).toHaveBeenCalledWith(wrapper.state().user);
  });

  it('should sign up user', () => {
    wrapper.setState({
      user: {
        firstName: 'Taiwo',
        lastName: 'Kolawole',
        username: 'omokolataiwo@gmail.com',
        password: ''
      }
    });
    const instance = wrapper.instance();
    instance.signup({ preventDefault: () => {} });
    expect(wrapper.state().errors).toEqual({
      signin: {},
      signup: { password: ['Password is too short'] }
    });
    wrapper.setState(prevState => ({ user: { ...prevState.user, password: '3232djsd' } }));
    instance.signup({ preventDefault: () => {} });
    expect(props.signin).toHaveBeenCalledWith(wrapper.state().user);
  });

  it('should search sheet cheat', () => {
    const instance = wrapper.instance();
    instance.onSearchSheetCheat({ preventDefault: () => {}, target: { value: 'repo' } });
    expect(props.searchSheetCheat).toHaveBeenCalledWith('repo');
  });

  it('should redirect when user signin or signout', () => {
    wrapper.setProps({ user: { type: SIGNIN_SUCCESSFUL } });
    expect(props.history.push).toHaveBeenCalledWith('/user');
  });

  it('should set error on signin state when signup failed', () => {
    props.resetUserState = jest.fn(() => {
      wrapper.setProps({ user: { type: INITIAL_USER_STATE } });
    });

    wrapper.setProps({
      ...props,
      user: { type: SIGNUP_FAILED, errors: { signup: { firstName: ['Invalid username or password'] } } }
    });
    expect(wrapper.state().errors.signup).toEqual({ firstName: ['Invalid username or password'] });
    wrapper.unmount();
  });
});
