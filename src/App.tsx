import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/shared/ProtectedRoute';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/Landing/LandingPage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const SignupPage = lazy(() => import('./pages/Auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/Auth/ForgotPasswordPage'));
const OTPVerificationPage = lazy(() => import('./pages/Auth/OTPVerificationPage'));
const OnboardingPage = lazy(() => import('./pages/Onboarding/OnboardingPage'));
const DashboardPage = lazy(() => import('./pages/Dashboard/DashboardPage'));
const SoulHealthPage = lazy(() => import('./pages/SoulHealth/SoulHealthPage'));
const ProfilePage = lazy(() => import('./pages/Profile/ProfilePage'));
const AdvisorPage = lazy(() => import('./pages/Advisor/AdvisorPage'));
const SafeSpacePage = lazy(() => import('./pages/SafeSpace/SafeSpacePage'));
const NotificationsPage = lazy(() => import('./pages/Notifications/NotificationsPage'));
const SettingsPage = lazy(() => import('./pages/Settings/SettingsPage'));

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--color-soul-bg)', flexDirection: 'column', gap: '1rem',
    }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '50%',
        border: '3px solid var(--color-soul-border)',
        borderTopColor: 'var(--color-soul-accent)',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ fontFamily: 'var(--font-body)', color: 'var(--color-soul-text-muted)', fontSize: '0.875rem' }}>Loading...</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <Routes>
              {/* Public */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/verify-otp" element={<OTPVerificationPage />} />

              {/* Protected */}
              <Route path="/apply" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/soul-health" element={<ProtectedRoute><SoulHealthPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/advisor" element={<ProtectedRoute><AdvisorPage /></ProtectedRoute>} />
              <Route path="/safe-space" element={<ProtectedRoute><SafeSpacePage /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
