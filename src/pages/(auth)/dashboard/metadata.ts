import { getTranslations } from 'next-intl/server';

interface MetadataProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: MetadataProps) {
  const t = await getTranslations('Dashboard.Meta');
  
  return {
    title: t('title'),
    description: t('description'),
  };
}
