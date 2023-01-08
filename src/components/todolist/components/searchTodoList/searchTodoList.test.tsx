import renderer from 'react-test-renderer';
import { AllTheProviders, render, screen } from '@Utils/testing';
import SearchTodoList from './searchTodoList';

describe('Test Button component', () => {
  const props = {
    result: {
      id: '63a99ee9e6e183933c167649',
      title: 'Grocery List',
      isError: false,
      isLoading: false,
      todo: [
        {
          id: '63a9b83550511904a6e0fe81',
          listId: '63a99ee9e6e183933c167649',
          completed: false,
          title: 'qwe',
        },
      ],
    },
  };
  const component = AllTheProviders({ children:<SearchTodoList {...props} /> });

  it('[Render] match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('[Render] toBeInTheDocument', () => {
    render(component);
    const element = screen.getByTestId('searchTodoList');
    expect(element).toBeInTheDocument();
  });
});
