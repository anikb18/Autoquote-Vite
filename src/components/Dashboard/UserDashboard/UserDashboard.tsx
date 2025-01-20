// UserDashboard.tsx
import { useTranslation } from 'react-i18next';
import { CarViewer } from '@/components/Dashboard/CarViewer/CarViewer';
import { ChatBot } from '../../chat/ChatBot';
import { motion } from 'framer-motion';
import { MdRefresh } from 'react-icons/md';
import { PiGearFill } from 'react-icons/pi';

// Add type for props
interface UserDashboardProps {
  user: any; // Replace 'any' with proper user type
}

// Named export
export const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const { t } = useTranslation('Dashboard'); // Fix useTranslation hook usage

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

            {/* Car Viewer Component */}
            <CarViewer car={{ make: 'Toyota', model: 'RAV4', year: 2024 }} />

          </div>
        </div>
      </div>

      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
};

export default UserDashboard;
