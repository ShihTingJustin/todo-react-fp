import renderer from 'react-test-renderer';
import { AllTheProviders, render, screen } from '@Utils/testing';
import SearchResult from './searchResult';

describe('Test Button component', () => {
  const props = {
    keyword: 'qwe',
  };
  const component = AllTheProviders({ children: <SearchResult {...props} /> });

  it('[Render] match snapshot', () => {
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('[Render] toBeInTheDocument', () => {
    render(component);
    const element = screen.getByTestId('searchResult');
    expect(element).toBeInTheDocument();
  });
});
