import renderer from 'react-test-renderer';
import { AllTheProviders, render, screen } from '@Utils/testing';
import TodoList from './normalTodoList';

describe('Test Button component', () => {
  const component = AllTheProviders({ children: <TodoList /> });

  it('[Render] match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('[Render] toBeInTheDocument', () => {
    render(component);
    const element = screen.getByTestId('normalTodoList');
    expect(element).toBeInTheDocument();
  });
});
