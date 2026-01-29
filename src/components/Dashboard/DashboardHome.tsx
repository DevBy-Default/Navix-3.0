import React from 'react';
import { Target, BookOpen, Trophy, TrendingUp, Calendar, Star, ArrowRight, Zap, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getLatestPsychometric } from '../../modules/psychometric/api';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

const DashboardHome = () => {
  const { user } = useAuth();
  const [psyResult, setPsyResult] = useState<null | (
    | { hasResult: false }
    | { hasResult: true; profileType: string; score: number; recommendedDomains: string[]; createdAt: string }
  )>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!user?.id) return;
      try {
        const r = await getLatestPsychometric(user.id);
        if (isMounted) setPsyResult(r as any);
      } catch {}
    })();
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const stats = [
    {
      label: 'Progress',
      value: `${Math.round((user?.completedSteps || 0) / (user?.totalSteps || 1) * 100)}%`,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900'
    },
    {
      label: 'Current Streak',
      value: `${user?.streak || 0} days`,
      icon: Zap,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100 dark:bg-amber-900'
    },
    {
      label: 'Badges Earned',
      value: user?.badges?.length || 0,
      icon: Trophy,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900'
    },
    {
      label: 'Skills Learning',
      value: '5 Active',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900'
    }
  ];

  const recentActivities = [
    { action: 'Completed React.js Fundamentals', time: '2 hours ago', type: 'learning' },
    { action: 'Applied to Microsoft Internship', time: '1 day ago', type: 'application' },
    { action: 'New scholarship match found', time: '2 days ago', type: 'scholarship' },
    { action: 'AI Agent suggestion: Practice coding problems', time: '3 days ago', type: 'suggestion' }
  ];

  const upcomingTasks = [
    { task: 'Complete Node.js module', deadline: 'Tomorrow', priority: 'High' },
    { task: 'Apply to Google Summer of Code', deadline: 'In 3 days', priority: 'Medium' },
    { task: 'Practice system design problems', deadline: 'This week', priority: 'Medium' },
    { task: 'Update LinkedIn profile', deadline: 'Next week', priority: 'Low' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <motion.h1
          className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Welcome back, {user?.name}!
        </motion.h1>
        <motion.p
          className="text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Let's continue your journey toward becoming a {user?.selectedRole || 'tech professional'}
        </motion.p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover-lift"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              title={`Your ${stat.label}: ${stat.value}`}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center animate-pulse-glow`}
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon className={stat.color} size={24} />
                </motion.div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Psychometric Test Callout */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
              <FlaskConical className="text-blue-600" size={22} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Psychometric Testing</h3>
              {psyResult && 'hasResult' in psyResult && psyResult.hasResult ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">Latest: {psyResult.profileType} • Score {psyResult.score}</p>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">Discover your strengths to personalize learning and career paths.</p>
              )}
            </div>
          </div>
          <div>
            {psyResult && 'hasResult' in psyResult && psyResult.hasResult ? (
              <div className="flex gap-2">
                <Link to="/psychometric-test" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">View Result</Link>
                <Link to="/psychometric-test" className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Retake Test</Link>
              </div>
            ) : (
              <Link to="/psychometric-test" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Take Psychometric Test</Link>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Overview */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Learning Progress</h2>
              <Target className="text-blue-600" size={24} />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Full Stack Development Roadmap</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {user?.completedSteps}/{user?.totalSteps} steps
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <motion.div
                  className="bg-naval h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((user?.completedSteps || 0) / (user?.totalSteps || 1)) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
                ></motion.div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Next: Backend Development with Node.js</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                  <span>Continue</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Recent Achievements</h3>
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {user?.badges?.map((badge, index) => (
                  <motion.span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-emerald-600 text-white animate-bounce-in"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    title={`Achievement: ${badge}`}
                  >
                    <Star size={14} className="mr-1" />
                    {badge}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Privacy Notice */}
            <motion.div
              className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your data is protected in accordance with Government of India privacy standards. All information is secure and used solely for educational and scholarship purposes.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div variants={itemVariants}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Upcoming Tasks</h2>
              <Calendar className="text-emerald-600" size={24} />
            </div>
            
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    task.priority === 'High' ? 'bg-red-500' :
                    task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white font-medium">{task.task}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{task.deadline}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-center hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
              View All Tasks
            </button>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants} className="mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover-lift animate-shimmer"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                title={`${activity.action} - ${activity.time}`}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'learning' ? 'bg-blue-100 dark:bg-blue-900' :
                    activity.type === 'application' ? 'bg-emerald-100 dark:bg-emerald-900' :
                    activity.type === 'scholarship' ? 'bg-amber-100 dark:bg-amber-900' :
                    'bg-purple-100 dark:bg-purple-900'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {activity.type === 'learning' && <BookOpen className="text-blue-600" size={20} />}
                  {activity.type === 'application' && <Target className="text-emerald-600" size={20} />}
                  {activity.type === 'scholarship' && <Trophy className="text-amber-600" size={20} />}
                  {activity.type === 'suggestion' && <Zap className="text-purple-600" size={20} />}
                </motion.div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardHome;