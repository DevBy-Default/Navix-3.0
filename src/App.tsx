import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Layout/Navbar';
import LoginForm from './components/Auth/LoginForm';
import DashboardHome from './components/Dashboard/DashboardHome';
import DomainsPage from './components/Domains/DomainsPage';
import RoadmapPage from './components/Roadmap/RoadmapPage';
import AgentsPage from './components/Agents/AgentsPage';
import ApplicationsPage from './components/Applications/ApplicationsPage';
import ScholarshipsPage from './components/Scholarships/ScholarshipsPage';
import PsychometricTestPage from './components/Psychometric/PsychometricTestPage';

function AppContent() {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <motion.div
        className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            className="w-16 h-16 bg-tricolor rounded-xl flex items-center justify-center mx-auto mb-4 animate-float"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          >
            <span className="text-white font-bold text-2xl">BS</span>
          </motion.div>
          <motion.div
            className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          ></motion.div>
          <motion.p
            className="mt-4 text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Loading NaviX Portal...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <main className="pt-4" role="main" aria-label="Main content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DashboardHome />
              </motion.div>
            } />
            <Route path="/domains" element={
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <DomainsPage />
              </motion.div>
            } />
            <Route path="/roadmap" element={
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <RoadmapPage />
              </motion.div>
            } />
            <Route path="/agents" element={
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <AgentsPage />
              </motion.div>
            } />
            <Route path="/applications" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <ApplicationsPage />
              </motion.div>
            } />
            <Route path="/scholarships" element={
              <motion.div
                initial={{ opacity: 0, rotateY: -10 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 10 }}
                transition={{ duration: 0.3 }}
              >
                <ScholarshipsPage />
              </motion.div>
            } />
            <Route path="/psychometric-test" element={
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <PsychometricTestPage />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;