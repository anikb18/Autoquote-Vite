import { clsx } from 'clsx';
import { UserButton } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

type HeadingProps = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.ComponentPropsWithoutRef<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;

export function Heading({ level = 2, ...props }: HeadingProps) {
  const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <Component
      {...props}
      className={clsx(
        props.className,
        'font-display tracking-tight text-gray-900 dark:text-white',
        {
          'text-4xl font-medium': level === 1,
          'text-3xl font-medium': level === 2,
          'text-2xl font-medium': level === 3,
          'text-xl font-medium': level === 4,
          'text-lg font-medium': level === 5,
          'text-base font-medium': level === 6,
        },
      )}
    />
  );
}

export function Header() {
  const t = useTranslations();

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <div className="flex flex-1 items-center gap-4 md:gap-6">
        <div className="flex-1">
          <Heading level={1} className="font-semibold text-lg md:text-xl">
            AutoQuote24
          </Heading>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex items-center space-x-4">
            <a
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/dashboard"
            >
              {t('nav.dashboard')}
            </a>
            <a
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/settings"
            >
              {t('nav.settings')}
            </a>
          </nav>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9"
              }
            }}
          />
        </div>
      </div>
    </header>
  );
}
