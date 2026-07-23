import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User } from '../types';
import { MOCK_USER, MOCK_CREDENTIALS } from '../data/mock';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('soulmeet_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('soulmeet_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 1200));
    if (
      email.toLowerCase() === MOCK_CREDENTIALS.email.toLowerCase() &&
      password === MOCK_CREDENTIALS.password
    ) {
      setUser(MOCK_USER);
      localStorage.setItem('soulmeet_user', JSON.stringify(MOCK_USER));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials. Use demo@soulmeet.com / Demo@1234' };
  };

  const signup = async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 1200));
    const newUser: User = {
      ...MOCK_USER,
      id: `usr_${Date.now()}`,
      name,
      email,
      onboardingComplete: false,
    };
    setUser(newUser);
    localStorage.setItem('soulmeet_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('soulmeet_user');
    localStorage.removeItem('soulmeet_onboarding');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('soulmeet_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
