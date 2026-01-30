import { useState, useEffect } from 'react';
import { User } from '../types';

interface StoredUser extends User {
  password: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const storedUser = localStorage.getItem('NaviX-user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('NaviX-users') || '[]');
    const existingUser = users.find((u: StoredUser) => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const newUser: StoredUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      educationLevel: 'Undergraduate',
      interests: [],
      goals: [],
      completedSteps: 0,
      totalSteps: 8,
      badges: [],
      streak: 0
    };

    users.push(newUser);
    localStorage.setItem('NaviX-users', JSON.stringify(users));
    localStorage.setItem('NaviX-user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('NaviX-users') || '[]');
    const foundUser = users.find((u: StoredUser) => u.email === email && u.password === password);
    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    localStorage.setItem('NaviX-user', JSON.stringify(foundUser));
    setUser(foundUser);
    return foundUser;
  };

  const googleLogin = async () => {
    // Simulate Google OAuth login
    const googleUser = {
      id: 'google-' + Date.now().toString(),
      name: 'Google User',
      email: 'user@gmail.com',
      password: '', // No password for Google users
      educationLevel: 'Undergraduate',
      interests: ['Technology', 'AI'],
      goals: ['Learn new skills', 'Career growth'],
      completedSteps: 1,
      totalSteps: 8,
      badges: ['Google User'],
      streak: 1
    };

    // Check if Google user already exists
    const users = JSON.parse(localStorage.getItem('NaviX-users') || '[]');
    const existingUser = users.find((u: StoredUser) => u.id === googleUser.id);
    if (!existingUser) {
      users.push(googleUser);
      localStorage.setItem('NaviX-users', JSON.stringify(users));
    }

    localStorage.setItem('NaviX-user', JSON.stringify(googleUser));
    setUser(googleUser);
    return googleUser;
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

      // Update in users array
      const users = JSON.parse(localStorage.getItem('NaviX-users') || '[]');
      const userIndex = users.findIndex((u: StoredUser) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        localStorage.setItem('NaviX-users', JSON.stringify(users));
      }
    }
  };

  return { user, isLoading, signup, login, googleLogin, logout, updateUser };
};
