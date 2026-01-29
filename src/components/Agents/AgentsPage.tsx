import React, { useState } from 'react';
import { Send, Bot, Zap } from 'lucide-react';
import { agents } from '../../data/mockData';
import { Agent, ChatMessage } from '../../types';
import { motion } from 'framer-motion';

const AgentsPage = () => {
  const [activeAgent, setActiveAgent] = useState<Agent>(agents[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      agentId: '1',
      message: "Hi! I'm CareerBot, your AI career mentor. I can help you with roadmap planning, skill development, and career decisions. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      agentId: activeAgent.id,
      message: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, activeAgent);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        agentId: activeAgent.id,
        message: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);

    setInputMessage('');
  };

  const generateAIResponse = (userMessage: string, agent: Agent): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (agent.id === '1') { // CareerBot
      if (lowerMessage.includes('roadmap') || lowerMessage.includes('learning')) {
        return "Great question! Based on your Full Stack Developer goal, I recommend focusing on your current Node.js module next. It's crucial for backend development. Would you like me to suggest some specific projects to practice with?";
      } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
        return "For Full Stack Development, your priority skills should be: 1) JavaScript mastery, 2) React.js proficiency, 3) Node.js & Express, 4) Database design (MongoDB/PostgreSQL), 5) Git & deployment. Which area would you like to dive deeper into?";
      } else if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
        return "The job market for Full Stack Developers is excellent! Average salaries range from ₹6-12 LPA for entry-level positions. I recommend building 2-3 strong portfolio projects and practicing system design. Would you like me to suggest some project ideas?";
      }
      return "I'm here to guide your career journey! I can help with roadmap planning, skill prioritization, job market insights, and career decisions. What specific aspect would you like to explore?";
    } else if (agent.id === '2') { // ScholarshipBot
      if (lowerMessage.includes('scholarship') || lowerMessage.includes('funding')) {
        return "I found 3 scholarships matching your profile! The National Scholarship Portal (95% match) has a deadline of Dec 31, 2024. Tata Trusts Scholarship (88% match) offers ₹2-10 LPA support. Would you like detailed application guidance for any of these?";
      } else if (lowerMessage.includes('application') || lowerMessage.includes('apply')) {
        return "For scholarship applications, you'll need: 1) Academic transcripts, 2) Income certificate, 3) Statement of Purpose, 4) Letters of recommendation. I can help you craft compelling applications. Which scholarship interests you most?";
      }
      return "I specialize in finding scholarships and funding opportunities! I've already identified several matches for your profile. Would you like to explore scholarship options or need help with applications?";
    } else if (agent.id === '3') { // OutreachBot
      if (lowerMessage.includes('email') || lowerMessage.includes('outreach')) {
        return "I can help you craft professional outreach emails! For internship applications, I recommend: 1) Personalized subject line, 2) Brief introduction, 3) Relevant skills/projects, 4) Clear ask, 5) Professional closing. Would you like me to draft an email for a specific company?";
      } else if (lowerMessage.includes('linkedin') || lowerMessage.includes('network')) {
        return "LinkedIn outreach is powerful! Use this structure: 1) Mention mutual connections/interests, 2) Brief background, 3) Specific question or value offer, 4) Respectful ask. I can help you craft personalized messages. Who would you like to connect with?";
      }
      return "I'm your outreach specialist! I can help you write compelling cold emails, LinkedIn messages, and application letters. Whether it's for internships, jobs, or research opportunities, I've got you covered. What type of outreach do you need?";
    }

    return "I'm here to help! Feel free to ask me anything related to my expertise.";
  };

  const switchAgent = (agent: Agent) => {
    setActiveAgent(agent);
    setMessages([
      {
        id: Date.now().toString(),
        agentId: agent.id,
        message: `Hi! I'm ${agent.name}, your ${agent.role.toLowerCase()}. ${agent.description} How can I assist you today?`,
        isUser: false,
        timestamp: new Date()
      }
    ]);
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
      className="max-w-6xl mx-auto p-6 h-[calc(100vh-8rem)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          AI Career Agents 🤖
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get personalized guidance from specialized AI agents designed to help you succeed in your career journey.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Agent Selection Sidebar */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Available Agents
            </h2>
            
            <div className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => switchAgent(agent)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    activeAgent.id === agent.id
                      ? 'bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 border-2 border-blue-200 dark:border-blue-700'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="text-2xl">{agent.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {agent.name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {agent.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {agent.description}
                  </p>
                  {agent.isActive && (
                    <div className="flex items-center space-x-1 mt-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 dark:text-green-400">Online</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div variants={itemVariants} className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{activeAgent.avatar}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {activeAgent.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activeAgent.role} • Online
                  </p>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <Zap className="text-amber-500" size={16} />
                  <span className="text-xs text-gray-600 dark:text-gray-400">AI Powered</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    {!message.isUser && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot size={16} className="text-blue-600" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          {activeAgent.name}
                        </span>
                      </div>
                    )}
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Ask ${activeAgent.name} anything...`}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-2 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-2">
                {activeAgent.id === '1' && (
                  <>
                    <button
                      onClick={() => setInputMessage("What should I focus on in my roadmap?")}
                      className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Roadmap guidance
                    </button>
                    <button
                      onClick={() => setInputMessage("What skills should I prioritize?")}
                      className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Skill priorities
                    </button>
                  </>
                )}
                {activeAgent.id === '2' && (
                  <>
                    <button
                      onClick={() => setInputMessage("Show me scholarship matches")}
                      className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Find scholarships
                    </button>
                    <button
                      onClick={() => setInputMessage("Help with application")}
                      className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Application help
                    </button>
                  </>
                )}
                {activeAgent.id === '3' && (
                  <>
                    <button
                      onClick={() => setInputMessage("Draft a cold email for internship")}
                      className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Draft cold email
                    </button>
                    <button
                      onClick={() => setInputMessage("Help with LinkedIn outreach")}
                      className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      LinkedIn message
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AgentsPage;