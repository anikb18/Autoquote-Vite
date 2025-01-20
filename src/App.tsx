import React from "react";
import { StrictMode, Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { Toaster as Sonner } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from "./providers/theme-provider";
import { ViewModeProvider } from './contexts/ViewModeContext';
import { LoadingSpinner } from './components/ui/loading-spinner';
import { AuthProvider, useAuth } from './features/auth/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary';
import AuthCallback from './pages/(auth)/callback';
import SignInPage from './pages/(auth)/(center)/sign-in/[[...sign-in]]/index';
import { UserRoles } from './types/roles';
import { roleService } from './lib/roleService';

// Lazy load components for better performance
const DashboardLayout = lazy(() => import('./components/layouts/DashboardLayout'));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const QuotesPage = lazy(() => import('./pages/(auth)/dashboard/quotes'));
const NewQuotePage = lazy(() => import('./pages/(auth)/dashboard/quotes/new'));
const InventoryPage = lazy(() => import('./pages/(auth)/dashboard/inventory'));
const ChatPage = lazy(() => import('./pages/(auth)/dashboard/chat'));
const PaymentsPage = lazy(() => import('./pages/(auth)/dashboard/payments'));
const AnalyticsPage = lazy(() => import('./pages/(auth)/dashboard/analytics'));
const UsersPage = lazy(() => import('./pages/(auth)/dashboard/users'));
const SettingsPage = lazy(() => import('./pages/(auth)/dashboard/settings'));
const DealerDashboard = lazy(() => import('./pages/(auth)/dashboard/dealer'));
const AdminBlogPage = lazy(() => import('./pages/(auth)/dashboard/blog'));
const ProfileTest = lazy(() => import('./components/ProfileTest'));
const NotFound = lazy(() => import('./components/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute - user:', user, 'loading:', loading);
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/callback" element={<AuthCallback />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Suspense fallback={<LoadingSpinner />}>
                <DashboardLayout />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route index element={<DealerDashboard />} />
          <Route path="quotes" element={<QuotesPage />} />
          <Route path="quotes/new" element={<NewQuotePage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="blog" element={<AdminBlogPage />} />
          <Route path="profile" element={<ProfileTest />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <TooltipProvider>
                <ViewModeProvider user={undefined}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <AppRoutes />
                    <Toaster />
                    <Sonner />
                  </Suspense>
                </ViewModeProvider>
              </TooltipProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
