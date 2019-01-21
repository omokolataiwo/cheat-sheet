import React from 'react';
import { shallow } from 'enzyme';
import NavigationBar from '../../../web/src/components/container/NavigationBar';

let props = {
  cheat: { description: 'init repository', line: 'git init' },
  onAddToFavorite: jest.fn(() => {})
};
const wrapper = shallow(<NavigationBar {...props} />);

describe('Cheat Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should render admin nav bar', () => {
    props = { ...props, adminBar: true };
    const wrapper = shallow(<NavigationBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
