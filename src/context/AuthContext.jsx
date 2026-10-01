import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%232563eb'/><circle cx='50' cy='36' r='20' fill='%23ffffff'/><path d='M20 85 c0-18 15-28 30-28 s30 10 30 28 z' fill='%23ffffff'/></svg>";

export const demoUsers = {
  admin: {
    id: "ADM-001",
    name: "Muzamil Khan",
    email: "admin@smartcampus.ai",
    role: "admin",
    department: "System Administration",
    avatar: DEFAULT_AVATAR,
    designation: "Chief Academic Administrator"
  },
  teacher: {
    id: "FAC-2001",
    name: "Dr. Robert Vance",
    email: "robert.vance@campus.edu",
    role: "teacher",
    department: "Computer Science",
    avatar: DEFAULT_AVATAR,
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
    avatar: DEFAULT_AVATAR,
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
    avatar: DEFAULT_AVATAR
  }
};

export const AuthProvider = ({ children }) => {
  // Helper to retrieve custom saved avatars from localStorage
  const getCustomAvatarsMap = () => {
    try {
      const saved = localStorage.getItem('campus_custom_avatars');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  };

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('campus_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.role === 'admin') {
        parsed.name = "Muzamil Khan";
        parsed.email = "admin@smartcampus.ai";
      }
      const customAvatars = getCustomAvatarsMap();
      if (customAvatars[parsed.id]) {
        parsed.avatar = customAvatars[parsed.id];
      } else if (!parsed.avatar || parsed.avatar.includes('unsplash.com')) {
        parsed.avatar = DEFAULT_AVATAR;
      }
      return parsed;
    }
    return null;
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
    const selectedUser = { ...(demoUsers[roleKey] || demoUsers.admin) };
    const customAvatars = getCustomAvatarsMap();
    if (customAvatars[selectedUser.id]) {
      selectedUser.avatar = customAvatars[selectedUser.id];
    } else {
      selectedUser.avatar = DEFAULT_AVATAR;
    }
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

  // Upload/Change Avatar function
  const updateAvatar = (newAvatarDataUrl) => {
    if (!user) return;
    const customAvatars = getCustomAvatarsMap();
    customAvatars[user.id] = newAvatarDataUrl;
    localStorage.setItem('campus_custom_avatars', JSON.stringify(customAvatars));

    const updatedUser = { ...user, avatar: newAvatarDataUrl };
    setUser(updatedUser);
  };

  // Remove Custom Avatar function (Restore generic default)
  const removeAvatar = () => {
    if (!user) return;
    const customAvatars = getCustomAvatarsMap();
    delete customAvatars[user.id];
    localStorage.setItem('campus_custom_avatars', JSON.stringify(customAvatars));

    const updatedUser = { ...user, avatar: DEFAULT_AVATAR };
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      login,
      logout,
      switchRole,
      updateAvatar,
      removeAvatar,
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
