import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  // Initialize with Admin credentials
  useEffect(() => {
    const hasAdmin = employees.some(emp => emp.username === 'Admin');
    if (!hasAdmin) {
      setEmployees(prev => [
        ...prev,
        {
          id: 'admin-1',
          username: 'Admin',
          password: '1593',
          role: 'admin',
          name: 'System Admin'
        }
      ]);
    }
    setLoading(false);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const login = (username, password) => {
    const user = employees.find(
      emp => emp.username.toLowerCase() === username.toLowerCase() && emp.password === password
    );
    
    if (user) {
      setCurrentUser({
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name
      });
      toast.success(`Welcome back, ${user.name}!`);
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const exists = employees.some(emp => 
      emp.username.toLowerCase() === userData.username.toLowerCase()
    );
    
    if (exists) {
      return false;
    }
    
    const newUser = {
      id: `user-${Date.now()}`,
      ...userData,
    };
    
    setEmployees(prev => [...prev, newUser]);
    setCurrentUser({
      id: newUser.id,
      username: newUser.username,
      role: newUser.role,
      name: newUser.name
    });
    
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const addEmployee = (employeeData) => {
    const exists = employees.some(emp => 
      emp.username.toLowerCase() === employeeData.username.toLowerCase()
    );
    
    if (exists) {
      return false;
    }
    
    const newEmployee = {
      id: `emp-${Date.now()}`,
      ...employeeData,
      role: employeeData.role || 'deliverer'
    };
    
    setEmployees(prev => [...prev, newEmployee]);
    return true;
  };

  const updateUserProfile = (userId, updates) => {
    setEmployees(prev => 
      prev.map(emp => emp.id === userId ? { ...emp, ...updates } : emp)
    );
    
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => ({
        ...prev,
        ...updates
      }));
    }
    
    return true;
  };

  const deleteEmployee = (employeeId) => {
    setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    return true;
  };

  const value = {
    currentUser,
    employees,
    loading,
    login,
    register,
    logout,
    addEmployee,
    updateUserProfile,
    deleteEmployee,
    isAdmin: currentUser?.role === 'admin',
    isSeller: currentUser?.role === 'admin' || currentUser?.role === 'deliverer'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}