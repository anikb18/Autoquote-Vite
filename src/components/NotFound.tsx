'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation('Error');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-main to-secondary/20 flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center shadow-xl border border-white/20"
      >
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white/90 mb-6">
          {t('pageNotFound')}
        </h2>
        <p className="text-white/70 mb-8">
          {t('pageNotFoundMessage')}
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-blue/90 transition-colors"
        >
          {t('backToHome')}
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
