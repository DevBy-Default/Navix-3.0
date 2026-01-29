import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, Play, BookOpen, Video, FileText, ExternalLink } from 'lucide-react';
import { roadmapSteps } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

const RoadmapPage = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const { user, updateUser } = useAuth();

  const handleStepComplete = (stepId: string) => {
    // Toggle step completion
    updateUser({
      completedSteps: (user?.completedSteps || 0) + 1
    });
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'Course': return BookOpen;
      case 'Video': return Video;
      case 'Article': return FileText;
      default: return BookOpen;
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
      className="max-w-4xl mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Your Learning Roadmap 🗺️
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            {user?.selectedRole || 'Full Stack Developer'} • Step-by-step learning path
          </p>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Progress: {user?.completedSteps || 0}/{roadmapSteps.length} steps
            </div>
            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((user?.completedSteps || 0) / roadmapSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Roadmap Steps */}
      <div className="space-y-6">
        {roadmapSteps.map((step, index) => {
          const isActive = activeStep === step.id;
          const isCompleted = step.completed;
          const isCurrent = !isCompleted && index === (user?.completedSteps || 0);

          return (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 transition-all ${
                isCurrent 
                  ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800' 
                  : isCompleted 
                    ? 'border-green-500' 
                    : 'border-gray-200 dark:border-gray-700'
              } ${isActive ? 'scale-[1.02]' : ''}`}
            >
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setActiveStep(isActive ? null : step.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {isCompleted ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : isCurrent ? (
                      <Play className="text-blue-500" size={24} />
                    ) : (
                      <Circle className="text-gray-400" size={24} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-xl font-semibold ${
                        isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                      }`}>
                        {step.title}
                      </h3>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                          <Clock size={16} />
                          <span>{step.timeEstimate}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          step.priority === 'High' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            : step.priority === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`}>
                          {step.priority}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {step.description}
                    </p>

                    {isCurrent && (
                      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-blue-700 dark:text-blue-300 font-medium text-sm">
                          🎯 Current Focus: This is your next learning milestone!
                        </p>
                      </div>
                    )}

                    {!isCompleted && isCurrent && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStepComplete(step.id);
                        }}
                        className="mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-emerald-700 transition-all"
                      >
                        Mark as Complete
                      </button>
                    )}

                    {isActive && (
                      <div className="mt-6 space-y-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Learning Resources ({step.resources.length})
                        </h4>
                        
                        <div className="grid gap-4">
                          {step.resources.map((resource) => {
                            const Icon = getResourceIcon(resource.type);
                            
                            return (
                              <div
                                key={resource.id}
                                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center space-x-3">
                                    <Icon className="text-blue-600" size={20} />
                                    <div>
                                      <h5 className="font-medium text-gray-900 dark:text-white">
                                        {resource.title}
                                      </h5>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {resource.provider} • {resource.duration}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      resource.cost === 'Free'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                                    }`}>
                                      {resource.cost}
                                    </span>
                                    <div className="flex items-center space-x-1">
                                      <span className="text-yellow-500">⭐</span>
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {resource.rating}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                    {resource.type}
                                  </span>
                                  <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span>Open</span>
                                    <ExternalLink size={14} />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <motion.div 
        variants={itemVariants}
        className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-xl"
      >
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Keep Going! 🚀
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You're making great progress on your {user?.selectedRole || 'Full Stack Developer'} journey.
            Consistent daily practice is key to mastering these skills.
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{user?.completedSteps || 0}</div>
              <div className="text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{roadmapSteps.length - (user?.completedSteps || 0)}</div>
              <div className="text-gray-600 dark:text-gray-400">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{user?.streak || 0}</div>
              <div className="text-gray-600 dark:text-gray-400">Day Streak</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RoadmapPage;