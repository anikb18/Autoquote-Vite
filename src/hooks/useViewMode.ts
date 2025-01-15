import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ViewMode } from '@/components/ViewSwitcher';

interface ViewModeStore {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const useViewMode = create<ViewModeStore>()(
  persist(
    (set) => ({
      viewMode: 'admin',
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: 'view-mode',
    }
  )
);
