import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const demoUsers = {
  admin: {
    id: "ADM-001",
    name: "Dr. Elizabeth Warren",
    email: "admin@campus.edu",
    role: "admin",
    department: "System Administration",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    designation: "Chief Academic Administrator"
  },
  teacher: {
    id: "FAC-2001",
    name: "Dr. Robert Vance",
    email: "robert.vance@campus.edu",
    role: "teacher",
    department: "Computer Science",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    designation: "Professor & HOD",
    assignedCourses: ["CS-301 Algorithm Analysis", "CS-405 Artificial Intelligence"]
  },
  student: {
    id: "STU-1001",
    name: "Alex Morgan",
    email: "alex.morgan@campus.edu",
    role: "student",
    department: "Computer Science",
    program: "B.Tech CS",
    semester: "6th",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    cgpa: 3.85,
    attendance: "94.5%"
  },
  parent: {
    id: "PAR-5001",
    name: "Robert Morgan",
    email: "robert.morgan@gmail.com",
    role: "parent",
    childName: "Alex Morgan",
    childId: "STU-1001",
    childDepartment: "Computer Science",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campus_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentView, setCurrentView] = useState(() => {
    return user ? 'dashboard' : 'landing';
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (user) {
      localStorage.setItem('campus_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('campus_user');
    }
  }, [user]);

  const login = (roleKey = 'admin') => {
    const selectedUser = demoUsers[roleKey] || demoUsers.admin;
    setUser(selectedUser);
    setCurrentView('dashboard');
    setActiveTab('dashboard');
  };

  const logout = () => {
    setUser(null);
    setCurrentView('landing');
    setActiveTab('dashboard');
  };

  const switchRole = (roleKey) => {
    login(roleKey);
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login,
      logout,
      switchRole,
      currentView,
      setCurrentView,
      activeTab,
      setActiveTab
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
