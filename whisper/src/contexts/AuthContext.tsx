'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  karma: number;
  createdAt: Date;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Sample user data for demo purposes
const DEMO_USER: User = {
  id: '1',
  username: 'goodSamaritan',
  email: 'samaritan@example.com',
  avatarUrl: 'https://i.pravatar.cc/100?u=goodSamaritan',
  karma: 12500,
  createdAt: new Date('2021-03-12')
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // In a real app, this would verify the session/token with your backend
        const loggedIn = localStorage.getItem('whisper_auth') === 'true';
        
        if (loggedIn) {
          // For demo purposes, we'll use the sample user
          setUser(DEMO_USER);
        }
      } catch (error) {
        console.error('Failed to restore authentication state', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Login with email and password
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to your auth endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll just use sample user data
      setUser(DEMO_USER);
      localStorage.setItem('whisper_auth', 'true');
    } catch (error) {
      console.error('Login failed', error);
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Login with Google OAuth
  const loginWithGoogle = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would initiate the OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll just use sample user data
      setUser(DEMO_USER);
      localStorage.setItem('whisper_auth', 'true');
    } catch (error) {
      console.error('Google login failed', error);
      throw new Error('Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Register a new user
  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to your registration endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll just use sample user data with the provided username
      setUser({
        ...DEMO_USER,
        username,
        email,
        karma: 0,
        createdAt: new Date()
      });
      localStorage.setItem('whisper_auth', 'true');
    } catch (error) {
      console.error('Signup failed', error);
      throw new Error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout the current user
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would invalidate the session/token with your backend
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem('whisper_auth');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    loginWithGoogle,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
} 