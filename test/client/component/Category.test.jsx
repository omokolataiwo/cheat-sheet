import React from 'react';
import { shallow } from 'enzyme';
import Category from '../../../web/src/components/container/Category';

const props = {
  category: { title: 'Initialisation', cheats: [{ description: 'init repository', line: 'git init' }] },
  onAddToFavorite: jest.fn(() => {})
};
const wrapper = shallow(
  <Category {...props} />
);

describe('Category Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ ...props, category: {} });
  });
});
