import { StrictMode, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "./providers/theme-provider";
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { AuthProvider } from '@/features/auth/AuthProvider';
import HomePage from "./pages/home/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { ProfileTest } from './components/ProfileTest';
import QuotesPage from './pages/(auth)/dashboard/quotes/index';
import NewQuotePage from "@/pages/(auth)/dashboard/quotes/new"; // new.tsx
import InventoryPage from "@/pages/(auth)/dashboard/inventory";
import { ChatPage } from "@/pages/(auth)/dashboard/chat";
import PaymentsPage from '@/pages/(auth)/dashboard/payments';
import AnalyticsPage from '@/pages/(auth)/dashboard/analytics';
import UsersPage from "@/pages/(auth)/dashboard/users";
import SettingsPage from '@/pages/(auth)/dashboard/settings';
import DealerDashboard from '@/pages/(auth)/dashboard/dealer';
import AdminBlogPage from '@/pages/(auth)/dashboard/blog';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: 1,
      },
    },
  });

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ViewModeProvider children={""} user={undefined}>
            <TooltipProvider>
              <Router>
                <AuthProvider>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<DashboardLayout />}>
                      <Route path="quotes">
                        <Route index element={<QuotesPage />} />
                        <Route path="new" element={<NewQuotePage />} />
                      </Route>
                      <Route path="inventory" element={<InventoryPage />} />
                      <Route path="chat" element={<ChatPage />} />
                      <Route path="payments" element={<PaymentsPage />} />
                      <Route
                        path="analytics"
                        element={
                          <Suspense fallback={<LoadingSpinner />}>
                            <AnalyticsPage />
                          </Suspense>
                        }
                      />
                      <Route path="users" element={<UsersPage />} />
                      <Route path="dealer" element={<DealerDashboard />} />
                      <Route path="blog" element={<AdminBlogPage />} />
                      <Route path="profile" element={<ProfileTest />} />
                      <Route path="settings" element={<SettingsPage />} />
                    </Route>
                  </Routes>
                  <Toaster />
                  <Sonner />
                </AuthProvider>
              </Router>
            </TooltipProvider>
          </ViewModeProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;