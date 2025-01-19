'use client';

import { useRoleAccess } from '@/hooks/useRoleAccess';
import { useTranslations } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpRight, Car, DollarSign, Users, Bell, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';


interface DealerDashboardProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl?: string;
    userType: string;
  };
}

export default function DealerDashboard() {
  const { t } = useTranslations('dashboard');
  const { isDealer } = useRoleAccess();
  const { theme } = useTheme();
  const [showWelcome, setShowWelcome] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay('morning');
    else if (hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');

    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isDealer) return null;

  const displayName = user.firstName || t('defaultGreeting');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        {/* Animated Welcome Message */}
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#003139] to-[#446df6] text-white"
          >
            <h1 className="text-3xl font-bold">
              {t(`dealer.greetings.${timeOfDay}`, { name: displayName })}
            </h1>
            <p className="mt-2 text-gray-200">{t('dealer.welcomeMessage')}</p>
          </motion.div>
        )}

        {/* Live Auction Timer */}
        <div className="mb-6 p-4 rounded-xl bg-[#d1d2c3]/10 border border-[#d1d2c3]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#003139]" />
              <span className="font-medium">{t('dealer.nextAuctionEnds')}</span>
            </div>
            <CountdownTimer endTime={new Date().getTime() + 86400000} />
          </div>
        </div>

        {/* Stats Overview with Animations */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatCard
              title={t('dealer.stats.activeQuotes')}
              value="12"
              change="+3"
              type="positive"
              icon={<Car className="h-5 w-5" />}
              accentColor="#446df6"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatCard
              title={t('dealer.stats.wonBids')}
              value="45"
              change="+5"
              type="positive"
              icon={<DollarSign className="h-5 w-5" />}
              accentColor="#003139"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatCard
              title={t('dealer.stats.leads')}
              value="68"
              change="+12"
              type="positive"
              icon={<Users className="h-5 w-5" />}
              accentColor="#d1d2c3"
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <StatCard
              title={t('dealer.stats.revenue')}
              value="$45,678"
              change="+12"
              type="positive"
              icon={<DollarSign className="h-5 w-5" />}
              accentColor="#446df6"
            />
          </motion.div>
        </div>

        {/* Priority Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-[#003139] mb-4">
            {t('dealer.priorityActions')}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <PriorityAction
              title={t('dealer.actions.newQuotes')}
              count={3}
              href="/dealer/quotes/new"
              urgent
            />
            <PriorityAction
              title={t('dealer.actions.endingAuctions')}
              count={2}
              href="/dealer/auctions/ending"
            />
            <PriorityAction
              title={t('dealer.actions.pendingChats')}
              count={5}
              href="/dealer/chats"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#003139]">
              {t('dealer.recentActivity')}
            </h2>
            <button className="text-[#446df6] hover:text-[#003139] transition-colors text-sm font-medium">
              {t('dealer.viewAll')}
            </button>
          </div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, type, icon, accentColor }: {
  title: string;
  value: string;
  change: string;
  type: 'positive' | 'negative';
  icon: React.ReactNode;
  accentColor: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 hover:border-[#446df6] transition-colors">
      <div className="absolute inset-0 bg-gradient-to-br from-[#446df6]/5 to-transparent" />
      <div className="relative flex items-center justify-between mb-4">
        <div 
          className="statCardIcon"
          style={{ '--accent-color': accentColor } as React.CSSProperties}
        >
          {icon}
        </div>
        <span className={`text-sm font-medium ${type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
          {change}%
        </span>
      </div>
      <dl>
        <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
        <dd className="mt-1 text-3xl font-semibold text-[#003139]">{value}</dd>
      </dl>
    </div>
  );
}

function PriorityAction({ title, count, href, urgent = false }: {
  title: string;
  count: number;
  href: string;
  urgent?: boolean;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      className={`block p-4 rounded-xl border ${
        urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'
      } hover:border-[#446df6] transition-colors`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-[#003139]">{title}</span>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-sm ${
            urgent ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {count}
          </span>
          <ArrowUpRight className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </motion.a>
  );
}

function CountdownTimer({ endTime }: { endTime: number }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;
      
      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="font-mono text-lg font-bold text-[#003139]">
      {timeLeft}
    </div>
  );
}

function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: 'quote',
      message: 'New quote request for Honda Civic 2024',
      time: '5m ago'
    },
    {
      id: 2,
      type: 'bid',
      message: 'Won bid for Toyota Camry 2024',
      time: '1h ago'
    },
    {
      id: 3,
      type: 'chat',
      message: 'New message from John D.',
      time: '2h ago'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#446df6]/10">
              {activity.type === 'quote' && <Car className="h-4 w-4 text-[#446df6]" />}
              {activity.type === 'bid' && <DollarSign className="h-4 w-4 text-[#003139]" />}
              {activity.type === 'chat' && <Bell className="h-4 w-4 text-[#d1d2c3]" />}
            </div>
            <span className="text-sm text-gray-600">{activity.message}</span>
          </div>
          <span className="text-xs text-gray-400">{activity.time}</span>
        </motion.div>
      ))}
    </div>
  );
}
