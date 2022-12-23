import React, { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import ErrorBoundary from '@Pages/error';
import Spinner from '@Components/spinner';

const Home = React.lazy(() => import('@Pages/home'));

export const common: RouteObject[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<Spinner />}>
        <Home />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
  },
];
