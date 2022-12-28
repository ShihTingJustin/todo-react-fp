import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import Blank from './blank';

describe('Test Button component', () => {
  const props = {
    text: 'blank page',
  };
  const component = <Blank {...props} />;

  it('[Render] match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('[Render] toBeInTheDocument', () => {
    render(component);
    const element = screen.getByTestId('blank');
    expect(element).toBeInTheDocument();
  });
});
