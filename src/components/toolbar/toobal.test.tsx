import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import Toolbar from './index';

describe('Test Button component', () => {
  const component = <Toolbar />;

  it('[Render] match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('[Render] toBeInTheDocument', () => {
    render(component);
    const element = screen.getByTestId('toolbar');
    expect(element).toBeInTheDocument();
  });
});
