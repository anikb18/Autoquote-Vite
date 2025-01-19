// ActivityFeed.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Car, DollarSign } from 'lucide-react';

const ActivityFeed = ({ activities }) => {
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
};

export default ActivityFeed;