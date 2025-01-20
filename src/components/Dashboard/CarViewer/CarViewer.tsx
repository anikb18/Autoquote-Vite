import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PiArrowsHorizontalBold, PiArrowLeftBold, PiArrowRightBold } from 'react-icons/pi';
import { createCarImage } from '@/utils/carImage';

interface CarViewerProps {
  car: {
    make: string;
    model: string;
    year: number;
  };
}

const CAR_ANGLES = ['1', '5', '13', '17', '21', '25', '29', '33'];

export const CarViewer = ({ car }: CarViewerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const sensitivity = 5; // Adjust this value to control rotation speed

    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? -1 : 1;
      setCurrentAngleIndex((prev) => (prev + direction + CAR_ANGLES.length) % CAR_ANGLES.length);
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.addEventListener('mouseleave', handleMouseUp);
    return () => {
      viewer.removeEventListener('mouseleave', handleMouseUp);
    };
  }, []);

  const carImageUrl = createCarImage(car, CAR_ANGLES[currentAngleIndex]);

  return (
    <div className="relative">
      <div
        ref={viewerRef}
        className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-b from-white/5 to-white/10 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {carImageUrl && (
          <motion.div
            key={carImageUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={carImageUrl}
              alt={`${car.make} ${car.model}`}
              className="object-contain transition-transform duration-300 ease-out w-full h-full"
            />
          </motion.div>
        )}

        {/* Rotation Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white/90 text-sm flex items-center gap-2"
        >
          <PiArrowsHorizontalBold className="h-4 w-4" />
          <span>Drag to rotate</span>
        </motion.div>
      </div>

      {/* Manual Rotation Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() =>
            setCurrentAngleIndex((prev) => (prev - 1 + CAR_ANGLES.length) % CAR_ANGLES.length)
          }
          className="p-3 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-colors"
        >
          <PiArrowLeftBold className="h-5 w-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentAngleIndex((prev) => (prev + 1) % CAR_ANGLES.length)}
          className="p-3 rounded-full bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 transition-colors"
        >
          <PiArrowRightBold className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
};