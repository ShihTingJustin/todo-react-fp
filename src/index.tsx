import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@Redux/store';
import { RouterProvider, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@Utils/i18n';
import './style/global.scss';
import { allRouters } from '@Routes/index';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={allRouters} />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
);
