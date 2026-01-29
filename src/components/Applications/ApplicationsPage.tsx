import React, { useState } from 'react';
import { Building2, MapPin, DollarSign, Clock, ExternalLink, CheckCircle, Send, Star } from 'lucide-react';
import { jobs } from '../../data/mockData';
import { Job } from '../../types';
import { motion } from 'framer-motion';

const ApplicationsPage = () => {
  const [filter, setFilter] = useState<'all' | 'applied' | 'not-applied'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'salary' | 'company'>('match');

  const filteredJobs = jobs.filter(job => {
    if (filter === 'applied') return job.applied;
    if (filter === 'not-applied') return !job.applied;
    return true;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore;
    if (sortBy === 'company') return a.company.localeCompare(b.company);
    return 0;
  });

  const handleQuickApply = (jobId: string) => {
    // Simulate quick apply
    console.log(`Applying to job ${jobId}`);
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    if (score >= 80) return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
    if (score >= 70) return 'text-amber-600 bg-amber-100 dark:bg-amber-900 dark:text-amber-300';
    return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
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
          Job Applications 💼
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          AI-matched job opportunities based on your skills and career goals. Apply directly or get help with custom applications.
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
            <option value="all">All Jobs</option>
            <option value="applied">Applied</option>
            <option value="not-applied">Not Applied</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="match">Best Match</option>
            <option value="salary">Salary</option>
            <option value="company">Company</option>
          </select>
        </div>

        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>{jobs.filter(j => j.applied).length} Applied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>{jobs.filter(j => !j.applied).length} Available</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Apply Banner */}
      <motion.div 
        variants={itemVariants}
        className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl border border-blue-200 dark:border-blue-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              🚀 AI-Powered Auto Apply
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Let our AI agent apply to jobs automatically with customized cover letters and resume optimization.
            </p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 transition-all">
            Setup Auto Apply
          </button>
        </div>
      </motion.div>

      {/* Job Listings */}
      <div className="space-y-6">
        {sortedJobs.map((job) => (
          <motion.div
            key={job.id}
            variants={itemVariants}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 transition-all hover:shadow-xl ${
              job.applied 
                ? 'border-green-200 dark:border-green-700' 
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Building2 className="text-white" size={24} />
                </div>
                
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    {job.applied && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-xs font-medium">
                        <CheckCircle size={12} />
                        <span>Applied</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {job.company}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign size={16} />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job.matchScore)}`}>
                  <Star size={14} />
                  <span>{job.matchScore}% Match</span>
                </div>
              </div>
            </div>

            {/* Skills Match */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Required Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
                  <ExternalLink size={16} />
                  <span>View Details</span>
                </button>
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm">
                  Save Job
                </button>
              </div>

              <div className="flex items-center space-x-3">
                {!job.applied && (
                  <>
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                      Custom Apply
                    </button>
                    <button
                      onClick={() => handleQuickApply(job.id)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 transition-all flex items-center space-x-2"
                    >
                      <Send size={16} />
                      <span>Quick Apply</span>
                    </button>
                  </>
                )}
                {job.applied && (
                  <button className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-lg font-medium cursor-default">
                    Application Sent
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Application Tips */}
      <motion.div 
        variants={itemVariants}
        className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          💡 Application Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Optimize Your Profile</h4>
            <p>Keep your skills and projects updated to improve match scores.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Personalize Applications</h4>
            <p>Use our AI agent to craft customized cover letters for better results.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Follow Up</h4>
            <p>Send polite follow-up messages 1-2 weeks after applying.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ApplicationsPage;