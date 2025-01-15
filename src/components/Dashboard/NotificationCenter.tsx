'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { StackedLayout } from '@/components/Catalyst/stacked-layout';
import { Button } from '@/components/Catalyst/button';
import { type Notification, notificationService } from '@/lib/websocket';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface NotificationCenterProps {
  userId: string;
  translations: any;
}

export function NotificationCenter({ userId, translations }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe(userId, (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setHasUnread(true);
      
      // Show browser notification if permission granted
      if ('Notification' in window && Notification.permission === 'granted') {
        new window.Notification(notification.title, {
          body: notification.message,
          icon: '/icon.png'
        });
      }
    });

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      unsubscribe();
    };
  }, [userId]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setHasUnread(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {hasUnread && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <StackedLayout>
              <div className="flex items-center justify-between p-4">
                <h3 className="text-lg font-medium">{translations.notifications}</h3>
                {hasUnread && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                  >
                    {translations.markAllRead}
                  </Button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-gray-500">{notification.message}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-center text-gray-500">
                    {translations.noNotifications}
                  </p>
                )}
              </div>
            </StackedLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
