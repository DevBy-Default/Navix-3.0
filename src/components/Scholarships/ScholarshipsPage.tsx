import React, { useState } from 'react';
import { GraduationCap, Calendar, DollarSign, Target, ExternalLink, AlertCircle } from 'lucide-react';
import { scholarships } from '../../data/mockData';
import { Scholarship } from '../../types';
import { motion } from 'framer-motion';

const ScholarshipsPage = () => {
  const [filter, setFilter] = useState<'all' | 'government' | 'private' | 'international'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'amount' | 'deadline'>('match');

  const filteredScholarships = scholarships.filter(scholarship => {
    if (filter === 'government') return scholarship.provider.includes('Government') || scholarship.provider.includes('NSP');
    if (filter === 'private') return !scholarship.provider.includes('Government') && !scholarship.provider.includes('NSP') && scholarship.provider !== 'Google';
    if (filter === 'international') return scholarship.provider === 'Google' || scholarship.amount.includes('$');
    return true;
  });

  const sortedScholarships = [...filteredScholarships].sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore;
    if (sortBy === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    return 0;
  });

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    if (score >= 80) return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
    if (score >= 70) return 'text-amber-600 bg-amber-100 dark:bg-amber-900 dark:text-amber-300';
    return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
  };

  const getDeadlineUrgency = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 30) return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
    if (diffDays <= 60) return 'text-amber-600 bg-amber-100 dark:bg-amber-900 dark:text-amber-300';
    return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
  };

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

  return (
    <motion.div 
      className="max-w-6xl mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Scholarship Opportunities 🎓
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          AI-curated scholarships matching your profile, academic background, and career goals. 
          From government schemes to international opportunities.
        </p>
      </motion.div>

      {/* Filters and Stats */}
      <motion.div 
        variants={itemVariants} 
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0"
      >
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Scholarships</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
            <option value="international">International</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="match">Best Match</option>
            <option value="amount">Amount</option>
            <option value="deadline">Deadline</option>
          </select>
        </div>

        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <Target size={16} />
            <span>{scholarships.filter(s => s.matchScore >= 80).length} High Match</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>{scholarships.filter(s => {
              const deadline = new Date(s.deadline);
              const now = new Date();
              const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              return diffDays <= 30;
            }).length} Urgent</span>
          </div>
        </div>
      </motion.div>

      {/* AI Assistant Banner */}
      <motion.div 
        variants={itemVariants}
        className="mb-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              🤖 ScholarshipBot Ready to Help
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Get personalized application guidance, essay reviews, and deadline reminders from our AI agent.
            </p>
          </div>
          <button className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-emerald-700 hover:to-blue-700 transition-all">
            Chat with Bot
          </button>
        </div>
      </motion.div>

      {/* Scholarship Listings */}
      <div className="space-y-6">
        {sortedScholarships.map((scholarship) => (
          <motion.div
            key={scholarship.id}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-white" size={24} />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {scholarship.name}
                  </h3>
                  
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {scholarship.provider}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <DollarSign size={16} />
                      <span className="font-medium">{scholarship.amount}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>Due: {scholarship.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right space-y-2">
                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(scholarship.matchScore)}`}>
                  <Target size={14} />
                  <span>{scholarship.matchScore}% Match</span>
                </div>
                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getDeadlineUrgency(scholarship.deadline)}`}>
                  <AlertCircle size={12} />
                  <span>
                    {(() => {
                      const deadlineDate = new Date(scholarship.deadline);
                      const now = new Date();
                      const diffDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                      if (diffDays <= 30) return `${diffDays} days left`;
                      if (diffDays <= 60) return 'Due soon';
                      return 'Good time';
                    })()}
                  </span>
                </div>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Eligibility Requirements:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {scholarship.eligibility.map((criterion, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{criterion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Match Analysis */}
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Why This Matches You:</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {scholarship.matchScore >= 90 && "Excellent fit based on your academic background, financial profile, and career goals."}
                {scholarship.matchScore >= 80 && scholarship.matchScore < 90 && "Strong match for your profile. Consider highlighting your leadership experience in the application."}
                {scholarship.matchScore < 80 && "Good potential match. Focus on demonstrating alignment with the scholarship's mission in your essay."}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center space-x-1">
                  <ExternalLink size={16} />
                  <span>View Details</span>
                </button>
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm">
                  Save for Later
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                  Get Application Help
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-blue-700 transition-all">
                  Start Application
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Application Resources */}
      <motion.div 
        variants={itemVariants}
        className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📚 Scholarship Application Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Essay Writing Guide</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Learn how to craft compelling scholarship essays that stand out.</p>
            <button className="text-purple-600 hover:text-purple-700 font-medium">View Guide</button>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Document Checklist</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Complete checklist of documents needed for scholarship applications.</p>
            <button className="text-purple-600 hover:text-purple-700 font-medium">Download</button>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Interview Prep</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-3">Common scholarship interview questions and how to prepare.</p>
            <button className="text-purple-600 hover:text-purple-700 font-medium">Start Prep</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScholarshipsPage;