import React from 'react';
import { shallow } from 'enzyme';
import SigninForm from '../../../web/src/components/container/SigninForm';

const props = {
  user: { username: '', password: '' },
  errors: {},
  signInError: ['Invalid username/password']
};
const wrapper = shallow(<SigninForm {...props} />);

describe('Signin Form Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
