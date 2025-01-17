import { StrictMode, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/theme-provider";
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { AuthProvider } from '@/features/auth/AuthProvider';
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { DashboardContent } from "@/pages/(auth)/dashboard/DashboardContent";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  });

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ViewModeProvider>
            <TooltipProvider>
              <BrowserRouter>
                <AuthProvider>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Suspense fallback={<LoadingSpinner size="lg" fullScreen />}>
                            <DashboardLayout />
                          </Suspense>
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<DashboardContent />} />
                    </Route>
                  </Routes>
                  <Toaster />
                  <Sonner />
                </AuthProvider>
              </BrowserRouter>
            </TooltipProvider>
          </ViewModeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;