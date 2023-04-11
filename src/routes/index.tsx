import { createBrowserRouter } from 'react-router-dom';
import { common } from './common';

export const allRouters = createBrowserRouter([...common], {
  basename: process.env.REACT_APP_PUBLIC_URL,
});
