import React from 'react';
import { mount } from 'enzyme';
import SignupForm from '../../../web/src/components/container/SignupForm';

const props = {
  user: {},
  errors: {}
};
const wrapper = mount(<SignupForm {...props} />);

describe('Signup Form Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
