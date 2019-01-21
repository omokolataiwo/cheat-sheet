import React from 'react';
import { shallow } from 'enzyme';
import SideNavPage from '../../../web/src/components/container/SideNavPage';
import { SIGNIN_SUCCESSFUL } from '../../../web/src/actions/type';

const props = {
  onFormFieldChange: jest.fn(() => {}),
  onSignin: jest.fn(() => {}),
  onSignup: jest.fn(() => {}),
  user: {},
  errors: {},
  userAction: { errors: {} }
};

const wrapper = shallow(<SideNavPage {...props} />);

describe('SideNavPage Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should close modal', () => {
    const instance = wrapper.instance();
    instance.sNavInstance = { close: () => {} };
    instance.modalInstance = { close: () => {} };
    wrapper.setProps({ ...props, userAction: { ...props.userAction, type: SIGNIN_SUCCESSFUL } });
  });
});
