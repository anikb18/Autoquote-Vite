import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PreferencesManager } from '@/components/Admin/PreferencesManager';

interface PageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
  const t = await getTranslations('Admin.Preferences');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function AdminPreferencesPage({ params }: PageProps) {
  setRequestLocale(params.locale);

  const user = await currentUser();
  if (!user) {
    redirect(`/${params.locale}/login`);
  }

  // Check if user is admin
  const publicMetadata = user.publicMetadata;
  if (publicMetadata?.role !== 'admin') {
    redirect(`/${params.locale}/dashboard`);
  }

  const t = await getTranslations('Admin.Preferences');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t('title')}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('subtitle')}
          </p>
        </div>

        <PreferencesManager 
          translations={{
            sections: {
              defaults: t('sections.defaults'),
              templates: t('sections.templates'),
              rules: t('sections.rules'),
            },
            fields: {
              vehicleType: t('fields.vehicleType'),
              budget: t('fields.budget'),
              features: t('fields.features'),
              usage: t('fields.usage'),
            },
            actions: {
              save: t('actions.save'),
              reset: t('actions.reset'),
              create: t('actions.create'),
              delete: t('actions.delete'),
            },
            messages: {
              saveSuccess: t('messages.saveSuccess'),
              saveError: t('messages.saveError'),
              deleteSuccess: t('messages.deleteSuccess'),
              deleteError: t('messages.deleteError'),
            },
          }}
          locale={params.locale}
        />
      </div>
    </div>
  );
}
