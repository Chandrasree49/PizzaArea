'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { INITIAL_USERS } from '../data/initialData';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string; role?: Role }>;
  register: (data: { name: string; email: string; password: string; role: Role; businessName?: string; image?: string }) => Promise<{ success: boolean; message: string; role?: Role }>;
  loginWithGoogle: (role?: Role) => Promise<{ success: boolean; message: string; role?: Role }>;
  logout: () => void;
  updateProfile: (data: { name: string; image?: string; businessName?: string }) => Promise<{ success: boolean; message: string }>;
  refreshUser: () => Promise<void>;
  isAdmin: boolean;
  isVendor: boolean;
  isCustomer: boolean;
  isPremium: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('pizzaarea_token') || localStorage.getItem('pizzahub_token');
        const storedUser = localStorage.getItem('pizzaarea_user') || localStorage.getItem('pizzahub_user');

        if (storedToken && storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);

         
          try {
            const res = await fetch(`${API_BASE}/auth/me`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            });
            if (res.ok) {
              const data = await res.json();
              if (data.user) {
                setUser(data.user);
                localStorage.setItem('pizzaarea_user', JSON.stringify(data.user));
              }
            } else if (res.status === 401 || res.status === 403) {
       
              localStorage.removeItem('pizzaarea_token');
              localStorage.removeItem('pizzaarea_user');
              setToken(null);
              setUser(null);
            }
          } catch {
    
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
     
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem('pizzaarea_token', data.token);
          localStorage.setItem('pizzaarea_user', JSON.stringify(data.user));
          return { success: true, message: data.message, role: data.user.role };
        } else if (!res.ok && res.status !== 500 && res.status !== 502 && res.status !== 503) {
          return { success: false, message: data.message || 'Login failed' };
        }
      } catch {
      }

      const foundDemo = INITIAL_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (foundDemo) {
        if (foundDemo.isBlocked) {
          return { success: false, message: 'Your account is blocked by an administrator.' };
        }
        const mockToken = `mock_jwt_${foundDemo.id}_${Date.now()}`;
        setUser(foundDemo);
        setToken(mockToken);
        localStorage.setItem('pizzaarea_token', mockToken);
        localStorage.setItem('pizzaarea_user', JSON.stringify(foundDemo));
        return { success: true, message: 'Welcome back!', role: foundDemo.role };
      }

      return { success: false, message: 'Invalid email or password.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    role: Role;
    businessName?: string;
    image?: string;
  }) => {
    setIsLoading(true);
    try {
      try {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        if (res.ok && result.success) {
          setUser(result.user);
          setToken(result.token);
          localStorage.setItem('pizzaarea_token', result.token);
          localStorage.setItem('pizzaarea_user', JSON.stringify(result.user));
          return { success: true, message: result.message, role: result.user.role };
        } else if (!res.ok && res.status !== 500 && res.status !== 502) {
          return { success: false, message: result.message || 'Registration failed' };
        }
      } catch {
   
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        name: data.name,
        email: data.email.toLowerCase(),
        role: data.role,
        businessName: data.role === 'vendor' ? (data.businessName || `${data.name}'s Pizzeria`) : '',
        subscriptionPlan: 'free',
        isBlocked: false,
        image: data.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      };

      const mockToken = `mock_jwt_${newUser.id}_${Date.now()}`;
      setUser(newUser);
      setToken(mockToken);
      localStorage.setItem('pizzaarea_token', mockToken);
      localStorage.setItem('pizzaarea_user', JSON.stringify(newUser));

      return { success: true, message: 'Registration successful!', role: newUser.role };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (role: Role = 'customer') => {
    setIsLoading(true);
    try {
      const assignedRole: Role = role === 'vendor' ? 'vendor' : 'customer';
      const googlePayload = {
        name: 'Google Pizza Explorer',
        email: `google_${Date.now()}@example.com`,
        role: assignedRole,
        image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      };

      try {
        const res = await fetch(`${API_BASE}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(googlePayload),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem('pizzaarea_token', data.token);
          localStorage.setItem('pizzaarea_user', JSON.stringify(data.user));
          return { success: true, message: 'Google Sign In successful!', role: data.user.role };
        }
      } catch {
    
      }

   
      const newUser: User = {
        id: `google_user_${Date.now()}`,
        name: 'Google Pizza Explorer',
        email: googlePayload.email,
        role: googlePayload.role,
        businessName: googlePayload.role === 'vendor' ? "Explorer's Craft Pizza" : '',
        subscriptionPlan: 'free',
        isBlocked: false,
        image: googlePayload.image,
      };

      const mockToken = `mock_jwt_${newUser.id}_${Date.now()}`;
      setUser(newUser);
      setToken(mockToken);
      localStorage.setItem('pizzaarea_token', mockToken);
      localStorage.setItem('pizzaarea_user', JSON.stringify(newUser));

      return { success: true, message: 'Google Sign In successful!', role: newUser.role };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('pizzaarea_token');
    localStorage.removeItem('pizzaarea_user');
    localStorage.removeItem('pizzahub_token');
    localStorage.removeItem('pizzahub_user');
  };

  const updateProfile = async (data: { name: string; image?: string; businessName?: string }) => {
    if (!user) return { success: false, message: 'Not authenticated' };

    try {
      if (token && !token.startsWith('mock_')) {
        const res = await fetch(`${API_BASE}/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        const resData = await res.json();
        if (res.ok && resData.success) {
          setUser(resData.user);
          localStorage.setItem('pizzaarea_user', JSON.stringify(resData.user));
          return { success: true, message: 'Profile updated successfully!' };
        }
      }

    
      const updatedUser: User = {
        ...user,
        name: data.name,
        image: data.image || user.image,
        businessName: data.businessName !== undefined ? data.businessName : user.businessName,
      };
      setUser(updatedUser);
      localStorage.setItem('pizzaarea_user', JSON.stringify(updatedUser));
      return { success: true, message: 'Profile updated successfully!' };
    } catch {
      return { success: false, message: 'Failed to update profile' };
    }
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          localStorage.setItem('pizzaarea_user', JSON.stringify(data.user));
        }
      }
    } catch {
     
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        updateProfile,
        refreshUser,
        isAdmin: user?.role === 'admin',
        isVendor: user?.role === 'vendor',
        isCustomer: user?.role === 'customer',
        isPremium: user?.subscriptionPlan === 'premium',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
