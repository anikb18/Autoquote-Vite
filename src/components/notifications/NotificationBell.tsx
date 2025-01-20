// src/components/NotificationBell.tsx
'use client';

interface NotificationBellProps {
  count: number;
}

export function NotificationBell({ count }: NotificationBellProps) {
  return (
    <div className="relative">
      <Bell className="h-6 w-6 text-gray-500 hover:text-[#446df6] transition-colors" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#446df6] text-xs text-white flex items-center justify-center">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  );
}
