import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useViewMode } from '@/contexts/ViewModeContext';
import { useAuth } from '@/features/auth/AuthProvider';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { quickActions } from '@/contexts/quickActions';
import { navigation } from '@/contexts/navigation';
import { 
  PiCarFill, 
  PiCurrencyDollarBold, 
  PiChatCircleTextFill,
  PiGearFill,
  PiChartBarBold,
} from 'react-icons/pi';
import { MdRefresh } from 'react-icons/md';

interface Quote {
  id: string;
  vehicle: string;
  dealer: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
}

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { viewMode } = useViewMode();
  const [latestQuote, setLatestQuote] = useState<Quote | null>(null);

  const fetchLatestQuote = async () => {
    // TODO: Implement quote fetching
  };

  const actions = quickActions();

  const renderDealerDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-full bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Dealer Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Active Quotes</h3>
            <p className="text-3xl font-bold text-white">24</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Won Deals</h3>
            <p className="text-3xl font-bold text-white">12</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Response Rate</h3>
            <p className="text-3xl font-bold text-white">95%</p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-full bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-white">1,234</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Active Dealers</h3>
            <p className="text-3xl font-bold text-white">56</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Total Quotes</h3>
            <p className="text-3xl font-bold text-white">789</p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderUserDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Quote Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-full bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Your Latest Quote</h2>
          <button 
            onClick={() => fetchLatestQuote()}
            className="p-2 text-white/80 hover:text-white transition-colors"
          >
            <MdRefresh className="h-5 w-5" />
          </button>
        </div>
        {latestQuote ? (
          <div className="text-white">
            <p className="text-lg font-semibold">{latestQuote.vehicle}</p>
            <p className="text-white/70">Dealer: {latestQuote.dealer}</p>
            <p className="text-white/70">Price: ${latestQuote.price.toLocaleString()}</p>
            <p className="text-white/70">Status: {latestQuote.status}</p>
          </div>
        ) : (
          <p className="text-white/70">No quotes found. Start by requesting a new quote!</p>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="col-span-full md:col-span-1 bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="flex flex-col items-center p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              <action.icon className="h-8 w-8 text-white mb-2" />
              <span className="text-sm font-medium text-white text-center">{action.name}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="col-span-full md:col-span-2 bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/10">
            <PiCarFill className="h-6 w-6 text-white mt-1" />
            <div>
              <p className="text-white font-medium">New Quote Requested</p>
              <p className="text-white/70 text-sm">1 hour ago</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      {viewMode === 'dealer' ? renderDealerDashboard() :
       viewMode === 'admin' ? renderAdminDashboard() :
       renderUserDashboard()}
    </>
  );
}
