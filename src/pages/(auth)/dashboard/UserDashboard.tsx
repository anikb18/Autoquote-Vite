import { useState, useRef, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { useCar } from '@/hooks/useCar';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PiCarFill, 
  PiHandshakeFill,
  PiArrowsCounterClockwiseFill,
  PiSparkle
} from 'react-icons/pi';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface UserDashboardProps {
  user: User;
}

const AVAILABLE_YEARS = [2024, 2025];

export function UserDashboard({ user }: UserDashboardProps) {
  const { t } = useTranslation();
  const [selectedCar, setSelectedCar] = useState({
    make: 'Toyota',
    model: 'Corolla',
    year: 2025 // Default to latest model
  });

  const [showSparkle, setShowSparkle] = useState(false);
  const [lastRequest, setLastRequest] = useState<string | null>(null);

  const { carDetails, carImage, loading, error } = useCar({
    make: selectedCar.make,
    model: selectedCar.model,
    year: selectedCar.year
  });

  // Update last request when car details change
  useEffect(() => {
    if (carDetails[0]) {
      // Only update if the year is valid
      if (AVAILABLE_YEARS.includes(carDetails[0].year)) {
        setLastRequest(JSON.stringify({
          make: carDetails[0].make,
          model: carDetails[0].model,
          year: carDetails[0].year
        }));
      } else {
        // Reset to default year if invalid
        setSelectedCar(prev => ({
          ...prev,
          year: 2025
        }));
      }
    }
  }, [carDetails]);

  // Sync selected car with last request
  useEffect(() => {
    if (lastRequest) {
      const lastCar = JSON.parse(lastRequest);
      // Validate year before updating
      if (AVAILABLE_YEARS.includes(lastCar.year)) {
        setSelectedCar(lastCar);
      } else {
        // Use default year if invalid
        setSelectedCar(prev => ({
          ...lastCar,
          year: 2025
        }));
      }
    }
  }, [lastRequest]);

  // Micro-interaction for car refresh
  const handleRefresh = () => {
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 1000);
    
    // Cycle through available years
    const currentIndex = AVAILABLE_YEARS.indexOf(selectedCar.year);
    const nextIndex = (currentIndex + 1) % AVAILABLE_YEARS.length;
    setSelectedCar(prev => ({
      ...prev,
      year: AVAILABLE_YEARS[nextIndex]
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* 3D Car Viewer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 rounded-2xl shadow-lg border border-white/20 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
            <PiCarFill className="h-5 w-5 text-primary" />
            {t('dashboard.sections.car_viewer')}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="relative group"
            title={t('dashboard.actions.cycle_year')}
          >
            <PiArrowsCounterClockwiseFill className="h-5 w-5" />
            <span className="absolute -bottom-8 right-0 bg-black/75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {t('dashboard.actions.cycle_year')}
            </span>
            <AnimatePresence>
              {showSparkle && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute -top-1 -right-1"
                >
                  <PiSparkle className="h-4 w-4 text-yellow-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
        <motion.div 
          className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <motion.img 
              src={carImage} 
              alt={`${selectedCar.year} ${selectedCar.make} ${selectedCar.model}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
          {/* Year Badge */}
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
            <span>{selectedCar.year}</span>
            {selectedCar.year === 2025 && (
              <span className="bg-yellow-400 text-primary text-xs px-1.5 py-0.5 rounded-full">
                {t('dashboard.labels.latest')}
              </span>
            )}
          </div>
          {/* Error Message */}
          {error && (
            <div className="absolute bottom-4 left-4 right-4 bg-red-500/90 text-white px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
        </motion.div>
        <motion.div 
          className="mt-4 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {carDetails[0] && (
            <>
              {['make', 'model', 'year'].map((detail, index) => (
                <motion.div 
                  key={detail}
                  className="flex justify-between text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-gray-600 dark:text-gray-400">
                    {t(`dashboard.car_details.${detail}`)}:
                  </span>
                  <span className="font-medium">
                    {carDetails[0][detail as keyof typeof carDetails[0]]}
                  </span>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 rounded-2xl shadow-lg border border-white/20 p-6"
      >
        <h3 className="font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
          <PiHandshakeFill className="h-5 w-5 text-primary" />
          {t('dashboard.sections.quick_actions')}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { 
              icon: PiCarFill, 
              label: 'dashboard.actions.get_quote',
              onClick: () => {/* Handle get quote */}
            },
            { 
              icon: PiHandshakeFill, 
              label: 'dashboard.actions.sell_car',
              onClick: () => {/* Handle sell car */}
            }
          ].map((action, index) => (
            <motion.button 
              key={action.label}
              onClick={action.onClick}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-lg",
                "bg-white/50 dark:bg-gray-700/50 hover:bg-white/70 dark:hover:bg-gray-700/70",
                "transition-all duration-200"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <action.icon className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium">{t(action.label)}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
