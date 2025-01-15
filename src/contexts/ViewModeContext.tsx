import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/pages/(auth)/providers/AuthProvider';

type ViewMode = 'admin' | 'dealer' | 'user';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

const VIEW_MODE_STORAGE_KEY = 'autoquote-view-mode';

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [viewMode, setViewModeState] = useState<ViewMode>('user'); // Default to user

  console.log('ViewModeProvider - Current user:', user);
  console.log('ViewModeProvider - Current viewMode:', viewMode);

  // Update viewMode when user changes or component mounts
  useEffect(() => {
    const determineViewMode = () => {
      // First try to get from localStorage
      const savedMode = localStorage.getItem(VIEW_MODE_STORAGE_KEY) as ViewMode;
      console.log('ViewModeProvider - Saved mode from localStorage:', savedMode);
      
      if (savedMode && ['admin', 'dealer', 'user'].includes(savedMode)) {
        console.log('ViewModeProvider - Using saved mode:', savedMode);
        return savedMode;
      }
      
      // If not in localStorage or invalid, determine from user
      if (!user) {
        console.log('ViewModeProvider - No user, defaulting to user mode');
        return 'user';
      }
      
      console.log('ViewModeProvider - User email:', user.email);
      console.log('ViewModeProvider - User metadata:', user.user_metadata);

      if (user.email === 'anikbeauchemin18@gmail.com') {
        console.log('ViewModeProvider - Setting admin mode');
        return 'admin';
      } else if (user.user_metadata?.userType === 'dealer') {
        console.log('ViewModeProvider - Setting dealer mode');
        return 'dealer';
      }
      console.log('ViewModeProvider - Setting user mode');
      return 'user';
    };

    const newViewMode = determineViewMode();
    console.log('ViewModeProvider - Setting new viewMode:', newViewMode);
    setViewModeState(newViewMode);
    localStorage.setItem(VIEW_MODE_STORAGE_KEY, newViewMode);
  }, [user]);

  const setViewMode = (mode: ViewMode) => {
    console.log('ViewModeProvider - Manual viewMode change:', mode);
    setViewModeState(mode);
    localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
  };

  const value = { viewMode, setViewMode };
  console.log('ViewModeProvider - Providing context value:', value);

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
