import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/providers/theme-provider';
import { Button } from './ui/button';
import { LanguageSelector } from './ui/language-selector';
import { Container } from './Container';

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="block w-full p-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
    >
      {children}
    </Link>
  );
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700 dark:stroke-slate-200"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={`origin-center transition ${
          open ? 'scale-90 opacity-0' : ''
        }`}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={`origin-center transition ${
          !open ? 'scale-90 opacity-0' : ''
        }`}
      />
    </svg>
  );
}

function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <>
      <button
        type="button"
        className="relative z-10 flex h-8 w-8 items-center justify-center focus:outline-none"
        onClick={() => setIsOpen(true)}
        aria-label={t('home.openMenu')}
      >
        <MobileNavIcon open={isOpen} />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={setIsOpen} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-300/50 backdrop-blur-sm dark:bg-slate-900/50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="absolute inset-x-4 top-8 origin-top rounded-3xl bg-white p-8 shadow-xl dark:bg-gray-900 ring-1 ring-slate-900/5 dark:ring-white/10">
              <div className="flex flex-col space-y-4">
                <MobileNavLink to="#features">{t('home.features')}</MobileNavLink>
                <MobileNavLink to="#testimonials">{t('home.testimonials')}</MobileNavLink>
                <MobileNavLink to="#pricing">{t('home.pricing')}</MobileNavLink>
                <hr className="m-2 border-slate-300/40 dark:border-slate-700/40" />
                <MobileNavLink to="/login">{t('auth.signIn')}</MobileNavLink>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setCurrentTheme(systemTheme);

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
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link to="/" className="-m-1.5 p-1.5" aria-label="Home">
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={logoSrc}
                  type="image/svg+xml"
                />
                <source
                  media="(max-width: 767px)"
                  srcSet={iconSrc}
                  type="image/svg+xml"
                />
                <img
                  className="h-10 w-auto"
                  src={fallbackSrc}
                  alt="AutoQuote24"
                />
              </picture>
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <Link
                to="#features"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
              >
                {t('home.features')}
              </Link>
              <Link
                to="#testimonials"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
              >
                {t('home.testimonials')}
              </Link>
              <Link
                to="#pricing"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
              >
                {t('home.pricing')}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <LanguageSelector />
            <div className="hidden md:block">
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
              >
                {t('auth.signIn')}
              </Link>
            </div>
            <Button asChild className="rounded-full">
              <Link to="/register">
                <span>
                  {t('auth.getStarted')} <span className="hidden lg:inline">{t('auth.today')}</span>
                </span>
              </Link>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}