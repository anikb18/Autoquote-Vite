import { useViewMode } from '@/hooks/useViewMode';
import { Switch } from '@/components/Catalyst/switch';
import { useTranslation } from 'react-i18next';

export function ViewSwitcher() {
  const { viewMode, setViewMode } = useViewMode();
  const { t } = useTranslation();

  return (
    <Switch
      checked={viewMode === 'grid'}
      onChange={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
      className="group relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
    >
      <span className="sr-only">{t('common.toggleView')}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute h-full w-full rounded-md bg-white"
      />
      <span
        aria-hidden="true"
        className={`
          pointer-events-none absolute mx-auto h-4 w-4 transform rounded-full bg-gray-200 shadow ring-0 transition duration-200 ease-in-out
          ${viewMode === 'grid' ? 'translate-x-2' : '-translate-x-2'}
        `}
      />
    </Switch>
  );
}
