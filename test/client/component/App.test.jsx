import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../../web/src/App';

const props = {
  history: { push: jest.fn(() => {}) }
};

const wrapper = shallow(<App {...props} />);

describe('App Component', () => {
  it('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
