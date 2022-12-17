import { useRouteError, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ErrorResponse } from 'node_modules/@remix-run/router/dist/utils';

function ErrorBoundary() {
  const { t } = useTranslation();
  const error = useRouteError();

  return (
    <div className="h-screen grid place-items-center">
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-title-2 pb-4">
            {(error as ErrorResponse).status} {t('0-general-error-title')}
          </h3>
          <Link to="/">{t('0-general-error-button')}</Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
