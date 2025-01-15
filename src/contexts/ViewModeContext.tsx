import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';

type ViewMode = 'admin' | 'dealer' | 'user';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

const VIEW_MODE_STORAGE_KEY = 'autoquote-view-mode';

interface ViewModeProviderProps {
  children: ReactNode;
  user: User | null;
}

export function ViewModeProvider({ children, user }: ViewModeProviderProps) {
  const [viewMode, setViewModeState] = useState<ViewMode>('user'); // Default to user

  // Update viewMode when user changes or component mounts
  useEffect(() => {
    const determineViewMode = () => {
      // First try to get from localStorage
      const savedMode = localStorage.getItem(VIEW_MODE_STORAGE_KEY) as ViewMode;
      
      if (savedMode && ['admin', 'dealer', 'user'].includes(savedMode)) {
        return savedMode;
      }
      
      // If not in localStorage or invalid, determine from user
      if (!user) {
        return 'user';
      }

      if (user.email === 'anikbeauchemin18@gmail.com') {
        return 'admin';
      } else if (user.user_metadata?.userType === 'dealer') {
        return 'dealer';
      }
      return 'user';
    };

    const newMode = determineViewMode();
    setViewModeState(newMode);
  }, [user]);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
  };

  const value = {
    viewMode,
    setViewMode,
  };

  return (
    <ViewModeContext.Provider value={value}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
}
