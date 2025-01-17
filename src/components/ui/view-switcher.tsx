import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { cn } from '@/lib/utils';
import { PiUserGear, PiBuildings, PiUser } from 'react-icons/pi';

const views = [
  {
    id: 'admin',
    label: 'dashboard.views.admin',
    icon: PiUserGear,
  },
  {
    id: 'dealer',
    label: 'dashboard.views.dealer',
    icon: PiBuildings,
  },
  {
    id: 'customer',
    label: 'dashboard.views.customer',
    icon: PiUser,
  },
] as const;

export function ViewSwitcher() {
  const { t } = useTranslation();
  const { viewMode, setViewMode } = useViewMode();

  return (
    <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => setViewMode(view.id)}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
            viewMode === view.id
              ? 'bg-primary text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          )}
        >
          <view.icon className="h-4 w-4" />
          <span>{t(view.label)}</span>
        </button>
      ))}
    </div>
  );
}
