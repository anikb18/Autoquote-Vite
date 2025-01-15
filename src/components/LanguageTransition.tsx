'use client';

import { type FC, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguagePreference } from '@/hooks/useLanguagePreference';

interface LanguageTransitionProps {
  children: ReactNode;
}

export const LanguageTransition: FC<LanguageTransitionProps> = ({ children }) => {
  const { isLoading } = useLanguagePreference();

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-50 flex items-center justify-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
