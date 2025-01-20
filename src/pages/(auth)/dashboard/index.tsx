import React from 'react'
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/AuthProvider';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { quickActions } from '@/contexts/quickActions';
import { DashboardContent } from '@/components/Dashboard/DashboardContent/DashboardContent';
import { MdRefresh } from 'react-icons/md';
import { PiCarFill } from 'react-icons/pi';
import UserDashboard from '@/components/Dashboard/UserDashboard/UserDashboard';
import DealerDashboard from '@/pages/(auth)/dashboard/dealer/index.tsx'; 
import AdminDashboardContent from '@/pages/(auth)/admin/AdminDashboardContent'; 
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
  const [latestQuote, setLatestQuote] = useState<Quote | null>(null);

  const fetchLatestQuote = async () => {
    // TODO: Implement quote fetching
  };

  useEffect(() => {
    fetchLatestQuote();
  }, [fetchLatestQuote]);

  const actions = quickActions;

  return (
    <div className="space-y-6">
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

      {/* Dashboard Content */}
      <DashboardContent />
    </div>
  );
}