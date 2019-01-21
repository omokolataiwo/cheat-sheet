import React from 'react';
import { shallow } from 'enzyme';
import { AuthUser } from '../../../web/src/components/pages/AuthUser';

const props = {
  history: { push: jest.fn(() => {}) },
  cheat: { type: null, favorite: [] }
};
const wrapper = shallow(<AuthUser {...props} />);

describe('AuthUser Component', () => {
  it('should render component', () => {
    wrapper.setProps({ ...props, fetchFavoriteCheats: jest.fn(() => {}) });
    expect(wrapper).toMatchSnapshot();
  });
  it('should render favorite cheats', () => {
    wrapper.setProps({ ...props, cheat: { type: null, favorite: [{ description: 'Initial repository', line: 'git init' }] } });
  });
});
