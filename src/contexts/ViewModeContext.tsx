import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';

export type ViewMode = 'dealer' | 'user' | 'admin';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

interface ViewModeProviderProps {
  children: ReactNode;
  user: User | null;
}

export function ViewModeProvider({ children, user }: ViewModeProviderProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (user?.user_metadata?.role) {
      return user.user_metadata.role as ViewMode;
    }
    const savedMode = localStorage.getItem('viewMode');
    return (savedMode as ViewMode) || 'user';
  });

  useEffect(() => {
    if (user?.user_metadata?.role) {
      setViewMode(user.user_metadata.role as ViewMode);
    }
  }, [user?.user_metadata?.role]);

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  const value = { viewMode, setViewMode };

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
