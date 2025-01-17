import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  Transition,
} from '@headlessui/react'
import clsx from 'clsx'
import { useAuth } from '@/features/auth/AuthProvider'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Container'
import { useTheme } from '@/providers/theme-provider'

function MobileNavLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton as={Link} to={to} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700 dark:stroke-white"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  const { t } = useTranslation()
  
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <Transition as={Fragment}>
        <PopoverPanel className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 dark:bg-gray-800 dark:text-white">
          <MobileNavLink to="#features">{t('nav.features')}</MobileNavLink>
          <MobileNavLink to="#testimonials">{t('nav.testimonials')}</MobileNavLink>
          <MobileNavLink to="#pricing">{t('nav.pricing')}</MobileNavLink>
          <hr className="m-2 border-slate-300/40" />
          <MobileNavLink to="/sign-in">{t('common.signIn')}</MobileNavLink>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}

function LanguageSwitcher() {
  const { i18n } = useTranslation()
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en-US' ? 'fr-CA' : 'en-US'
    i18n.changeLanguage(newLang)
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleLanguage}
      className="text-sm font-semibold"
    >
      {i18n.language === 'en-US' ? 'FR' : 'EN'}
    </Button>
  )
}

export function Header() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link to="/" aria-label="Home">
              <img
                src="/dark.png"
                alt="Logo"
                className="h-8 w-auto dark:hidden"
              />
              <img
                src="/light.png"
                alt="Logo"
                className="hidden h-8 w-auto dark:block"
              />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <Link to="#features" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300">
                {t('nav.features')}
              </Link>
              <Link to="#testimonials" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300">
                {t('nav.testimonials')}
              </Link>
              <Link to="#pricing" className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-300">
                {t('nav.pricing')}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            {!user ? (
              <>
                <div className="hidden md:block">
                  <Link to="/sign-in" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    {t('common.signIn')}
                  </Link>
                </div>
                <Button asChild>
                  <Link to="/sign-up">
                    <span>
                      {t('common.signUp')} <span className="hidden lg:inline">{t('common.today')}</span>
                    </span>
                  </Link>
                </Button>
              </>
            ) : (
              <Button onClick={() => navigate('/dashboard')}>
    {t('common.dashboard')}
  </Button>
            )}
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}