import { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    if (data.success) {
 const userData = {
        email: data.email,
        fullName: data.fullName,
        role: data.role,
      };
      setUser(userData);
    }
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    if (data.success) {
      const user = {
        email: data.email,
        fullName: data.fullName,
        role: data.role,
      };
      setUser(user);
    }
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'Admin';
  };

  const isStaff = () => {
    return user?.role === 'Staff';
  };

  const isCustomer = () => {
    return user?.role === 'Customer';
  };

  const value = {
 user,
    login,
    register,
    logout,
    isAdmin,
    isStaff,
    isCustomer,
 isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
const context = useContext(AuthContext);
  if (!context) {
 throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
