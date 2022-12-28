import React, { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';

// import {  LocationProvider } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';

import { store } from '@Redux/store';

// const history = createHistory(window);
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render, AllTheProviders };
