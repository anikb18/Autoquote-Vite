import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function DemoBanner() {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-blue-600 p-4 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">
          {t('demo.message')}
        </p>
        <Link to="/signup">
          <Button variant="secondary" size="sm">
            {t('demo.signUp')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
