import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import i18n from './i18n';
import { AuthProvider } from "@/features/auth/AuthProvider";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { ThemeProvider } from "./providers/theme-provider";
import { TranslationsProvider } from '@/components/TranslationsProvider';
import { ViewModeProvider } from '@/contexts/ViewModeContext';

// Pages
import HomePage from './pages/HomePage';
import Index from "./pages/Index";
import SignInPage from './pages/(auth)/(center)/sign-in/[[...sign-in]]/page';
import SignUpPage from './pages/(auth)/(center)/sign-up/[[...sign-up]]/page';
import CenterLayout from './pages/(auth)/(center)/layout';
import DashboardLayout from '@/features/dashboard/layouts/DashboardLayout';

// Lazy loaded dashboard pages
const DashboardPage = lazy(() => import('./pages/(auth)/dashboard/page'));
const VehiclesPage = lazy(() => import('./pages/(auth)/dashboard/vehicles/page'));
const AnalyticsPage = lazy(() => import('./pages/(auth)/dashboard/analytics/page'));
const CustomersPage = lazy(() => import('./pages/(auth)/dashboard/customers/page'));
const SettingsPage = lazy(() => import('./pages/(auth)/dashboard/settings/page'));
const QuotesPage = lazy(() => import('./pages/(auth)/dashboard/quotes/page'));
const AuctionsPage = lazy(() => import('./pages/(auth)/dashboard/auctions/page'));
const MessagesPage = lazy(() => import('./pages/(auth)/dashboard/messages/page'));
const DealersPage = lazy(() => import('./pages/(auth)/dashboard/dealers/page'));
const DealershipPage = lazy(() => import('./pages/(auth)/dashboard/dealership/page'));
const TeamPage = lazy(() => import('./pages/(auth)/dashboard/team/page'));
const InventoryPage = lazy(() => import('./pages/(auth)/dashboard/inventory/page'));
const SecurityPage = lazy(() => import('./pages/(auth)/dashboard/security/page'));
const UserProfilePage = lazy(() => import('./pages/(auth)/UserProfile'));

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <TranslationsProvider>
            <ThemeProvider>
              <TooltipProvider>
                <Router>
                  <AuthProvider>
                    <ViewModeProvider>
                      <Suspense 
                        fallback={
                          <div className="flex items-center justify-center min-h-screen">
                            <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-blue-500" />
                          </div>
                        }
                      >
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/index" element={<Index />} />
                          
                          {/* Auth Routes */}
                          <Route element={<CenterLayout />}>
                            <Route path="/sign-in" element={<SignInPage />} />
                            <Route path="/sign-up" element={<SignUpPage />} />
                          </Route>

                          {/* Protected Dashboard Routes */}
                          <Route element={<ProtectedRoute />}>
                            <Route element={<DashboardLayout />}>
                              <Route path="/dashboard" element={<DashboardPage />} />
                              <Route path="/dashboard/vehicles" element={<VehiclesPage />} />
                              <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
                              <Route path="/dashboard/customers" element={<CustomersPage />} />
                              <Route path="/dashboard/settings" element={<SettingsPage />} />
                              <Route path="/dashboard/quotes" element={<QuotesPage />} />
                              <Route path="/dashboard/auctions" element={<AuctionsPage />} />
                              <Route path="/dashboard/messages" element={<MessagesPage />} />
                              <Route path="/dashboard/dealers" element={<DealersPage />} />
                              <Route path="/dashboard/dealership" element={<DealershipPage />} />
                              <Route path="/dashboard/team" element={<TeamPage />} />
                              <Route path="/dashboard/inventory" element={<InventoryPage />} />
                              <Route path="/dashboard/security" element={<SecurityPage />} />
                              <Route path="/dashboard/profile" element={<UserProfilePage />} />
                            </Route>
                          </Route>
                        </Routes>
                      </Suspense>
                      <Toaster />
                      <Sonner />
                    </ViewModeProvider>
                  </AuthProvider>
                </Router>
              </TooltipProvider>
            </ThemeProvider>
          </TranslationsProvider>
        </I18nextProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
