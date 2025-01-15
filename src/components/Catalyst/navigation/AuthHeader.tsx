import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Logo } from '../logo';

export function AuthHeader() {
  const { t } = useTranslation();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{t('common.home')}</span>
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
