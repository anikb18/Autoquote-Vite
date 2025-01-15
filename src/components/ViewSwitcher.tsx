import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useViewMode } from '@/contexts/ViewModeContext';
import { Eye } from 'lucide-react';

export type ViewMode = 'admin' | 'dealer' | 'user';

export function ViewSwitcher() {
  const { t } = useTranslation();
  const { viewMode, setViewMode } = useViewMode();

  return (
    <div className="flex items-center gap-2">
      <Eye className="h-4 w-4 text-muted-foreground" />
      <Select value={viewMode} onValueChange={(value: ViewMode) => setViewMode(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t('common.select_view')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">
            {t('views.admin')}
          </SelectItem>
          <SelectItem value="dealer">
            {t('views.dealer')}
          </SelectItem>
          <SelectItem value="user">
            {t('views.user')}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
