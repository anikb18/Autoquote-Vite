import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CarData, CarImageConfig, CAR_ANGLES, CAR_COLORS, generateCarImageUrl } from '@/utils/car-api';

interface CarViewerProps {
  car: CarData;
  className?: string;
}

export function CarViewer({ car, className = '' }: CarViewerProps) {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedColor, setSelectedColor] = useState(CAR_COLORS.GREEN);
  const [isLoading, setIsLoading] = useState(true);
  
  // Motion values for rotation
  const dragX = useMotionValue(0);
  const rotation = useSpring(useTransform(dragX, [-200, 200], [-30, 30]), {
    stiffness: 200,
    damping: 30
  });

  // Auto-rotate effect
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        dragX.set(dragX.get() + 1);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  // Generate image URLs for different angles
  const generateImages = (config: CarImageConfig = {}) => ({
    front: generateCarImageUrl(car, { ...config, angle: CAR_ANGLES.FRONT }),
    side: generateCarImageUrl(car, { ...config, angle: CAR_ANGLES.SIDE }),
    back: generateCarImageUrl(car, { ...config, angle: CAR_ANGLES.BACK }),
    top: generateCarImageUrl(car, { ...config, angle: CAR_ANGLES.TOP }),
  });

  // Current angle based on rotation
  const currentAngle = useTransform(rotation, [-30, 0, 30], [
    CAR_ANGLES.SIDE,
    CAR_ANGLES.FRONT,
    CAR_ANGLES.BACK,
  ]);

  // Current image URL based on angle and color
  const currentImageUrl = useTransform(currentAngle, (angle) => 
    generateCarImageUrl(car, { angle, color: selectedColor })
  );

  return (
    <div className={`relative aspect-[4/3] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Car viewer */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ rotateY: rotation }}
        drag="x"
        dragConstraints={{ left: -200, right: 200 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        dragElastic={0.2}
        dragMomentum={false}
        onDrag={(_, info) => dragX.set(info.offset.x)}
      >
        <motion.img
          src={currentImageUrl}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-contain"
          onLoad={() => setIsLoading(false)}
          style={{ opacity: isLoading ? 0 : 1 }}
          transition={{ opacity: { duration: 0.3 } }}
        />
      </motion.div>

      {/* Color selector */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        {Object.entries(CAR_COLORS).map(([name, color]) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColor === color
                ? 'border-white scale-110'
                : 'border-transparent scale-100'
            }`}
            style={{ 
              backgroundColor: color === 'radiant-green' ? '#00ff00' : color,
              opacity: 0.8 
            }}
            title={t(`dashboard.car.colors.${name.toLowerCase()}`)}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 right-4">
        <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-white text-sm">
          {isDragging ? (
            t('dashboard.car.release_to_stop')
          ) : (
            t('dashboard.car.drag_to_rotate')
          )}
        </div>
      </div>
    </div>
  );
}
