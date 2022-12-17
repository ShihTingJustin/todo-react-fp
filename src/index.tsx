import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@Utils/i18n';
import './style/global.scss';
import { allRouters } from '@Routes/index';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={allRouters} />
    </I18nextProvider>
  </React.StrictMode>
);
