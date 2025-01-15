import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('metadata.siteTitle')}</title>
        <meta name="description" content={t('metadata.siteDescription')} />
        <meta property="og:title" content={t('metadata.siteTitle')} />
        <meta property="og:description" content={t('metadata.siteDescription')} />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://autoquote24.com" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('metadata.siteTitle')} />
        <meta name="twitter:description" content={t('metadata.siteDescription')} />
        <meta name="twitter:image" content="/og-image.png" />
      </Helmet>
      {children}
    </>
  );
}
