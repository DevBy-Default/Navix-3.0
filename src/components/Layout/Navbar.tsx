import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Map,
  BookOpen,
  Bot,
  FileText,
  Trophy,
  FlaskConical,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Map, label: "Domains", path: "/domains" },
    { icon: BookOpen, label: "Roadmap", path: "/roadmap" },
    { icon: Bot, label: "AI Agents", path: "/agents" },
    { icon: FileText, label: "Applications", path: "/applications" },
    { icon: Trophy, label: "Scholarships", path: "/scholarships" },
    { icon: FlaskConical, label: "Psychometric", path: "/psychometric-test" },
  ];

  const isActive = (path) => location.pathname === path;

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  if (!user) return null;

  return (
    <motion.nav
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex items-center space-x-2"
            aria-label="Go to Dashboard"
          >
            <motion.div
              className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-sm">N</span>
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              NaviX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <motion.div
              className="flex items-center space-x-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.path} variants={navVariants}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                        isActive(item.path)
                          ? "bg-blue-600 text-white shadow"
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      aria-label={`Navigate to ${item.label}`}
                      aria-current={isActive(item.path) ? "page" : undefined}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* User + Theme + Logout */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="hidden md:block text-gray-700 dark:text-gray-300 font-medium">
                Welcome, {user.name}
              </span>
            </div>

            <motion.button
              onClick={logout}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Logout from NaviX"
            >
              <LogOut size={20} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className="md:hidden border-t border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          className="flex justify-around py-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.path} variants={navVariants}>
                <Link
                  to={item.path}
                  className={`flex flex-col items-center p-2 rounded-lg transition ${
                    isActive(item.path)
                      ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive(item.path) ? "page" : undefined}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
