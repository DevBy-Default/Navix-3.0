import React, { useState } from 'react';
import { ArrowRight, TrendingUp, DollarSign, Users } from 'lucide-react';
import { domains } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

const DomainsPage = () => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { user, updateUser } = useAuth();

  const handleSelectRole = (domainId: string, roleId: string) => {
    const domain = domains.find(d => d.id === domainId);
    const role = domain?.roles.find(r => r.id === roleId);
    
    if (domain && role) {
      updateUser({
        selectedDomain: domain.name,
        selectedRole: role.name
      });
      
      setSelectedDomain(domainId);
      setSelectedRole(roleId);
    }
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
      className="max-w-7xl mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Explore Career Domains 🚀
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Discover high-growth tech domains and find the perfect role that matches your interests and goals.
          Each domain offers multiple career paths with detailed roadmaps.
        </p>
      </motion.div>

      {user?.selectedDomain && (
        <motion.div 
          variants={itemVariants}
          className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl border border-blue-200 dark:border-blue-700"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Current Selection
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">{user.selectedDomain}</span> • <span className="font-medium">{user.selectedRole}</span>
          </p>
          <button className="mt-3 text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
            <span>View Roadmap</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      )}

      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-4xl">{domain.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {domain.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {domain.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 mb-6 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign className="text-green-600" size={16} />
                <span className="text-gray-600 dark:text-gray-400">
                  {domain.averageSalary}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-blue-600" size={16} />
                <span className="text-gray-600 dark:text-gray-400">
                  {domain.jobGrowth} growth
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="text-purple-600" size={16} />
                <span className="text-gray-600 dark:text-gray-400">
                  {domain.roles.length} roles
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Available Roles:</h4>
              {domain.roles.map((role) => (
                <div
                  key={role.id}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedDomain === domain.id && selectedRole === role.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => handleSelectRole(domain.id, role.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {role.name}
                    </h5>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        role.experienceLevel === 'Entry' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {role.experienceLevel}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {role.avgSalary}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {role.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {role.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {role.skills.length > 3 && (
                      <span className="px-2 py-1 text-gray-500 text-xs">
                        +{role.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {selectedDomain === domain.id && selectedRole === role.id && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-2 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 transition-all flex items-center justify-center space-x-2">
                        <span>Generate Learning Roadmap</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl text-white"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Not Sure Which Domain to Choose?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Take our AI-powered career assessment to discover domains that match your interests,
            strengths, and career goals. Get personalized recommendations in minutes.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Take Career Assessment
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DomainsPage;