import renderer from 'react-test-renderer';
import { AllTheProviders, render, screen } from '@Utils/testing';
import TodoListHeader from './header';

describe('Test Button component', () => {
  const props = {
    title: 'list title',
    plusButtonDisabled: false,
    onPlusClick: () => {},
    onMoreClick: () => {},
  };
  const component = AllTheProviders({ children: <TodoListHeader {...props} /> });

  it('[Render] match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('[Render] toBeInTheDocument', () => {
    render(component);
    const element = screen.getByTestId('todoListHeader');
    expect(element).toBeInTheDocument();
  });
});
