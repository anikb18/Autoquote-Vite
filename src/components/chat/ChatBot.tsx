import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiChatCircleTextFill, PiXBold } from 'react-icons/pi';
import { useTranslation } from 'react-i18next';

export function ChatBot() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-primary rounded-full shadow-lg text-white z-50"
      >
        <PiChatCircleTextFill className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold text-lg">AutoQuote24 Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <PiXBold className="h-5 w-5" />
              </button>
            </div>
            <div className="h-96 p-4">
              {/* Chat messages will go here */}
              <div className="text-center text-gray-500">
                {t('chat.welcome')}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
