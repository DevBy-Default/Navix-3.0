import { Domain, RoadmapStep, Agent, Scholarship, Job } from '../types';

export const domains: Domain[] = [
  {
    id: '1',
    name: 'Software Development',
    description: 'Build applications, websites, and software systems',
    icon: '💻',
    averageSalary: '₹8-15 LPA',
    jobGrowth: '22%',
    roles: [
      {
        id: '1',
        name: 'Full Stack Developer',
        description: 'Build complete web applications from frontend to backend',
        skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'HTML/CSS'],
        experienceLevel: 'Entry',
        avgSalary: '₹6-12 LPA'
      },
      {
        id: '2',
        name: 'Frontend Developer',
        description: 'Create user interfaces and user experiences',
        skills: ['React', 'Vue.js', 'JavaScript', 'CSS', 'UI/UX Design'],
        experienceLevel: 'Entry',
        avgSalary: '₹5-10 LPA'
      }
    ]
  },
  {
    id: '2',
    name: 'Cybersecurity',
    description: 'Protect systems and data from cyber threats',
    icon: '🛡️',
    averageSalary: '₹10-20 LPA',
    jobGrowth: '31%',
    roles: [
      {
        id: '3',
        name: 'Penetration Tester',
        description: 'Test systems for security vulnerabilities',
        skills: ['Ethical Hacking', 'Linux', 'Network Security', 'Python', 'Kali Linux'],
        experienceLevel: 'Entry',
        avgSalary: '₹8-15 LPA'
      }
    ]
  },
  {
    id: '3',
    name: 'Data Science & AI',
    description: 'Extract insights from data and build intelligent systems',
    icon: '🤖',
    averageSalary: '₹12-25 LPA',
    jobGrowth: '28%',
    roles: [
      {
        id: '4',
        name: 'Data Scientist',
        description: 'Analyze data to solve business problems',
        skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Pandas'],
        experienceLevel: 'Entry',
        avgSalary: '₹10-18 LPA'
      }
    ]
  },
  {
    id: '4',
    name: 'Blockchain Development',
    description: 'Build decentralized applications and smart contracts',
    icon: '⛓️',
    averageSalary: '₹15-30 LPA',
    jobGrowth: '67%',
    roles: [
      {
        id: '5',
        name: 'Smart Contract Developer',
        description: 'Develop and deploy smart contracts on blockchain',
        skills: ['Solidity', 'Web3.js', 'Ethereum', 'JavaScript', 'DApps'],
        experienceLevel: 'Entry',
        avgSalary: '₹12-25 LPA'
      }
    ]
  }
];

export const roadmapSteps: RoadmapStep[] = [
  {
    id: '1',
    title: 'Learn HTML & CSS Fundamentals',
    description: 'Master the building blocks of web development',
    timeEstimate: '2-3 weeks',
    priority: 'High',
    completed: true,
    resources: [
      {
        id: '1',
        title: 'HTML & CSS Complete Course',
        type: 'Course',
        url: 'https://www.youtube.com/watch?v=G3e-cpL7ofc',
        cost: 'Free',
        rating: 4.8,
        provider: 'SuperSimpleDev (YouTube)',
        duration: '6 hours'
      }
    ]
  },
  {
    id: '2',
    title: 'JavaScript Fundamentals',
    description: 'Learn programming logic and JavaScript basics',
    timeEstimate: '3-4 weeks',
    priority: 'High',
    completed: true,
    resources: [
      {
        id: '2',
        title: 'JavaScript - The Complete Guide',
        type: 'Course',
        url: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/',
        cost: 'Paid',
        rating: 4.6,
        provider: 'Udemy',
        duration: '52 hours'
      }
    ]
  },
  {
    id: '3',
    title: 'React.js Development',
    description: 'Build modern user interfaces with React',
    timeEstimate: '4-5 weeks',
    priority: 'High',
    completed: true,
    resources: [
      {
        id: '3',
        title: 'React - The Complete Guide',
        type: 'Course',
        url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
        cost: 'Paid',
        rating: 4.7,
        provider: 'Udemy',
        duration: '48 hours'
      }
    ]
  },
  {
    id: '4',
    title: 'Backend Development with Node.js',
    description: 'Learn server-side development',
    timeEstimate: '3-4 weeks',
    priority: 'High',
    completed: false,
    resources: [
      {
        id: '4',
        title: 'Node.js Complete Course',
        type: 'Course',
        url: 'https://www.youtube.com/watch?v=RLtyhwFtXQA',
        cost: 'Free',
        rating: 4.5,
        provider: 'Traversy Media (YouTube)',
        duration: '7 hours'
      }
    ]
  },
  {
    id: '5',
    title: 'Database Design & MongoDB',
    description: 'Learn database concepts and MongoDB',
    timeEstimate: '2-3 weeks',
    priority: 'Medium',
    completed: false,
    resources: [
      {
        id: '5',
        title: 'MongoDB Complete Tutorial',
        type: 'Course',
        url: 'https://www.youtube.com/watch?v=c2M-rlkkT5o',
        cost: 'Free',
        rating: 4.4,
        provider: 'freeCodeCamp (YouTube)',
        duration: '4 hours'
      }
    ]
  }
];

export const agents: Agent[] = [
  {
    id: '1',
    name: 'CareerBot',
    role: 'Career Mentor',
    avatar: '🧭',
    description: 'Guides you through career decisions and roadmap planning',
    isActive: true
  },
  {
    id: '2',
    name: 'ScholarshipBot',
    role: 'Scholarship Scout',
    avatar: '🎓',
    description: 'Finds scholarships and funding opportunities for you',
    isActive: true
  },
  {
    id: '3',
    name: 'OutreachBot',
    role: 'Outreach Assistant',
    avatar: '📧',
    description: 'Helps craft professional emails and applications',
    isActive: true
  }
];

export const scholarships: Scholarship[] = [
  {
    id: '1',
    name: 'National Scholarship Portal (NSP)',
    provider: 'Government of India',
    amount: '₹48,000-₹2,00,000',
    deadline: 'December 31, 2024',
    eligibility: ['Indian Citizen', 'Family Income < ₹8 LPA', 'Academic Merit'],
    matchScore: 95
  },
  {
    id: '2',
    name: 'Tata Trusts Scholarship',
    provider: 'Tata Trusts',
    amount: '₹2,00,000-₹10,00,000',
    deadline: 'January 15, 2025',
    eligibility: ['Undergraduate/Graduate', 'Financial Need', 'Academic Excellence'],
    matchScore: 88
  },
  {
    id: '3',
    name: 'Google Developer Scholarship',
    provider: 'Google',
    amount: '$1,000-$5,000',
    deadline: 'March 1, 2025',
    eligibility: ['Computer Science Student', 'Underrepresented Group', 'Leadership'],
    matchScore: 82
  }
];

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer Intern',
    company: 'Zomato',
    location: 'Bangalore',
    type: 'Internship',
    salary: '₹25,000-₹40,000/month',
    skills: ['React', 'JavaScript', 'HTML/CSS'],
    matchScore: 92,
    applied: false
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'Razorpay',
    location: 'Bangalore',
    type: 'Full-time',
    salary: '₹8-12 LPA',
    skills: ['Node.js', 'React', 'MongoDB'],
    matchScore: 87,
    applied: true
  },
  {
    id: '3',
    title: 'Software Engineer Intern',
    company: 'Microsoft',
    location: 'Hyderabad',
    type: 'Internship',
    salary: '₹50,000-₹80,000/month',
    skills: ['JavaScript', 'React', 'Python'],
    matchScore: 85,
    applied: false
  }
];