import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PiEyeFill } from 'react-icons/pi';

interface ViewSwitcherProps {
  className?: string;
}

export function ViewSwitcher({ className }: ViewSwitcherProps) {
  const { t } = useTranslation();
  const { viewMode, setViewMode } = useViewMode();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <PiEyeFill className="h-4 w-4 text-muted-foreground" />
      <Select
        value={viewMode}
        onValueChange={(value: 'dealer' | 'customer' | 'admin') => setViewMode(value)}
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={t('common.view_as')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('common.view_as')}</SelectLabel>
            <SelectItem value="customer">{t('common.buyer')}</SelectItem>
            <SelectItem value="dealer">{t('common.dealer')}</SelectItem>
            <SelectItem value="admin">{t('common.admin')}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
