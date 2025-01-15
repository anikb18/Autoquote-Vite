import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const defaultLocale = 'en'
export const locales = ['en', 'fr']

export function usePathname() {
  const location = useLocation()
  return location.pathname
}

export function useRouter() {
  const { i18n } = useTranslation()
  const location = useLocation()

  return {
    push: (path: string) => {
      window.location.href = path
    },
    locale: i18n.language,
    pathname: location.pathname,
    asPath: location.pathname + location.search
  }
}
