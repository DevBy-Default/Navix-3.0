import { useState, useEffect } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const storedUser = localStorage.getItem('NaviX-user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser.name = 'Durgesh Kumawat';
      localStorage.setItem('NaviX-user', JSON.stringify(parsedUser));
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (email: string, _password: string) => {
    // Simulate login
    const mockUser: User = {
      id: '1',
      name: 'Durgesh Kumawat',
      email,
      educationLevel: 'Undergraduate',
      interests: ['Technology', 'Problem Solving'],
      goals: ['Get Software Job', 'Learn AI/ML'],
      completedSteps: 3,
      totalSteps: 8,
      badges: ['Early Bird', 'Quick Learner'],
      streak: 5
    };
    
    localStorage.setItem('NaviX-user', JSON.stringify(mockUser));
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem('NaviX-user');
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('NaviX-user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return { user, isLoading, login, logout, updateUser };
};
