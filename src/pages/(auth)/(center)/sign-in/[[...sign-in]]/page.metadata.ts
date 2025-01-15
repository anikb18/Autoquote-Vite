import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'auth' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    metadataBase: new URL('https://autoquote24.com'),
  };
}
