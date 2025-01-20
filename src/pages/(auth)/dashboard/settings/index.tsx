import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from '@headlessui/react';
import { useAuth } from '@/features/auth/AuthProvider';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SettingsPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] = useState(true);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900">{t('settings.title')}</h1>
      <p className="mt-1 text-sm text-gray-500">{t('settings.description')}</p>

      <div className="mt-10 space-y-10">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t('settings.profile.title')}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            {t('settings.profile.description')}
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                {t('settings.profile.email')}
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{user?.email}</div>
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t('settings.preferences.title')}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            {t('settings.preferences.description')}
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                {t('settings.preferences.language')}
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">English</div>
                <button
                  type="button"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {t('common.update')}
                </button>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                {t('settings.preferences.dateFormat')}
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">MM/DD/YYYY</div>
                <button
                  type="button"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  {t('common.update')}
                </button>
              </dd>
            </div>
            <div className="pt-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                {t('settings.preferences.timezone')}
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <Switch
                  checked={automaticTimezoneEnabled}
                  onChange={setAutomaticTimezoneEnabled}
                  className={classNames(
                    automaticTimezoneEnabled ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                  )}
                >
                  <span
                    className={classNames(
                      automaticTimezoneEnabled ? 'translate-x-5' : 'translate-x-0',
                      'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
