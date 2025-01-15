'use client';

import { useTranslations } from 'next-intl';

interface MetadataProps {
  locale: string;
}

export default function MetadataComponent({ locale }: MetadataProps) {
  const t = useTranslations();

  return (
    <>
      <title>{t('SignUp.meta.title')}</title>
      <meta name="description" content={t('SignUp.meta.description')} />
    </>
  );
}
