'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  PiCarFill, 
  PiCurrencyDollarBold, 
  PiChatCircleTextFill, 
  PiGearFill,
  PiArrowsHorizontalBold,
  PiArrowLeftBold,
  PiArrowRightBold
} from 'react-icons/pi';
import { MdRefresh } from 'react-icons/md';
import { ChatBot } from '../chat/ChatBot';
import { createCarImage } from '@/utils/carImage';

const features = ['safety', 'performance', 'comfort'] as const;

interface Car {
  make: string;
  model: string;
  year: number;
  price: string;
  features: string[];
}

interface QuickAction {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  userType: string;
}

interface UserDashboardProps {
  user: User;
}

export function UserDashboard({ user }: UserDashboardProps) {
  const t = useTranslations('Dashboard');
  const [selectedCar, setSelectedCar] = useState<Car | null>({
    make: 'Honda',
    model: 'CR-V',
    year: 2024,
    price: '$35,000 - $38,000',
    features: [
      'Top safety ratings with Honda Sensing suite',
      'Spacious interior with 5 seats',
      'Excellent fuel economy (28 city/34 highway MPG)',
    ],
  });
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Available angles for smooth rotation
  const CAR_ANGLES = ['1', '5', '13', '17', '21', '25', '29', '33'];

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
      setCurrentAngleIndex((prev) => {
        const newIndex = (prev + direction + CAR_ANGLES.length) % CAR_ANGLES.length;
        return newIndex;
      });
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

  // Get car image URL
  const carImageUrl = selectedCar ? createCarImage({
    make: selectedCar.make,
    model: selectedCar.model,
    year: selectedCar.year
  }, CAR_ANGLES[currentAngleIndex]) : null;

  const quickActions: QuickAction[] = [
    {
      name: t('quickActions.requestQuote'),
      icon: <PiCarFill className="h-6 w-6 text-white" />,
      onClick: () => console.log('Get quotes'),
    },
    {
      name: t('quickActions.tradeInVehicle'),
      icon: <PiCurrencyDollarBold className="h-6 w-6 text-white" />,
      onClick: () => console.log('Trade-in'),
    },
    {
      name: t('quickActions.viewMessages'),
      icon: <PiChatCircleTextFill className="h-6 w-6 text-white" />,
      onClick: () => console.log('Messages'),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Content */}
      <div className="relative z-10">
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Navigation Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
            >
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-white">AutoQuote24</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    className="p-2 text-white/80 hover:text-white transition-colors"
                    aria-label="Refresh dashboard"
                    title="Refresh dashboard"
                  >
                    <MdRefresh className="h-5 w-5" />
                  </button>
                  <button 
                    className="p-2 text-white/80 hover:text-white transition-colors"
                    aria-label="Open settings"
                    title="Open settings"
                  >
                    <PiGearFill className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Car Details Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      {selectedCar
                        ? `${selectedCar.year} ${selectedCar.make} ${selectedCar.model}`
                        : ''}
                    </h1>
                    <p className="text-slate-700 mt-1 text-lg">
                      {selectedCar ? `${selectedCar.price}` : ''}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCar &&
                      selectedCar.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-slate-100 rounded-full text-sm font-medium text-slate-800"
                        >
                          {feature}
                        </span>
                      ))}
                  </div>
                </div>
              </motion.div>

              {/* 3D Car Viewer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 overflow-hidden"
              >
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
                        <Image
                          src={carImageUrl}
                          alt={`${selectedCar?.make} ${selectedCar?.model}`}
                          fill
                          className="object-contain transition-transform duration-300 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority
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
                      onClick={() => setCurrentAngleIndex((prev) => (prev - 1 + CAR_ANGLES.length) % CAR_ANGLES.length)}
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
              </motion.div>

              {/* Car Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {selectedCar?.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <span className="text-slate-800">{index + 1}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-slate-800 font-medium">{feature}</p>
                          <p className="text-slate-600 text-sm">{t(`features.${features[index % features.length]}`)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
              >
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{t('quickActions.title')}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.onClick}
                        className="flex flex-col items-center justify-center p-4 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-2">
                          {action.icon}
                        </div>
                        <span className="text-sm font-medium text-slate-800 text-center">{action.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
}
