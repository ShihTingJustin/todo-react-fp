import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import TodoItem from './todoItem';

describe('Test Button component', () => {
  const props = {
    todo: {
      id: '63a86c39dbd466d9f6fae7a2',
      title: 'test',
      listId: '63a84fe8ab46917a7747ff8e',
      completed: false,
    },
    onToggle: () => {},
    onDelete: () => {},
    onBlur: () => {},
  };
  const component = <TodoItem {...props} />;

  it('[Render] match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('[Render] toBeInTheDocument', () => {
    render(component);
    const element = screen.getByTestId('todoItem');
    expect(element).toBeInTheDocument();
  });
});
