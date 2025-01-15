import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from './button';
import { LanguageSelector } from './language-selector';
import { useTheme } from '@/providers/theme-provider';
import { useEffect, useState } from 'react';

export default function AuthHeader() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    // Handle system theme
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setCurrentTheme(systemTheme);

      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        setCurrentTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setCurrentTheme(theme as 'dark' | 'light');
    }
  }, [theme]);

  const logoSrc = currentTheme === 'dark' ? '/light.svg' : '/dark.svg';
  const iconSrc = currentTheme === 'dark' ? '/light-icon.svg' : '/icon.svg';
  const fallbackSrc = currentTheme === 'dark' ? '/light.png' : '/dark.png';

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">AutoQuote24</span>
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet={logoSrc}
                type="image/svg+xml"
              />
              <source
                media="(max-width: 1023px)"
                srcSet={iconSrc}
                type="image/svg+xml"
              />
              <img
                className="h-8 w-auto"
                src={fallbackSrc}
                alt="AutoQuote24"
              />
            </picture>
          </Link>
        </div>
        <div className="flex gap-4">
          <LanguageSelector />
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Button
              variant="ghost"
              asChild
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
            >
              <Link to="/login">
                {t('auth.signIn')} <span aria-hidden="true">&rarr;</span>
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}