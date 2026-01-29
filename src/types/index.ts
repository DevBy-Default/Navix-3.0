export interface User {
  id: string;
  name: string;
  email: string;
  educationLevel: string;
  interests: string[];
  goals: string[];
  selectedDomain?: string;
  selectedRole?: string;
  completedSteps: number;
  totalSteps: number;
  badges: string[];
  streak: number;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string;
  roles: Role[];
  averageSalary: string;
  jobGrowth: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  skills: string[];
  experienceLevel: 'Entry' | 'Mid' | 'Senior';
  avgSalary: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
  completed: boolean;
  timeEstimate: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Resource {
  id: string;
  title: string;
  type: 'Course' | 'Article' | 'Video' | 'Book' | 'Practice';
  url: string;
  cost: 'Free' | 'Paid';
  rating: number;
  provider: string;
  duration: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
  isActive: boolean;
}

export interface ChatMessage {
  id: string;
  agentId: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  matchScore: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Part-time';
  salary: string;
  skills: string[];
  matchScore: number;
  applied: boolean;
}