import React, { useState, useRef } from 'react';
import { useAuth, DEFAULT_AVATAR } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  Sun,
  Moon,
  Bell,
  Search,
  User,
  LogOut,
  GraduationCap,
  Sparkles,
  ChevronDown,
  Info,
  Menu,
  Camera,
  Trash2,
  Upload
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const Navbar = ({ onOpenMobileMenu, onOpenAboutModal }) => {
  const { user, logout, switchRole, setCurrentView, setActiveTab, updateAvatar, removeAvatar } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const { notifications, markNotificationRead } = useData();
  const { addToast } = useToast();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fileInputRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleColors = {
    admin: 'purple',
    teacher: 'blue',
    student: 'emerald',
    parent: 'amber'
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('students');
    }
  };

  // Handle avatar file selection & immediate preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file (JPG, PNG, WebP).', 'error', 'Invalid File');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      addToast('Image size should be under 5MB.', 'warning', 'File Too Large');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      updateAvatar(dataUrl);
      addToast('Profile avatar updated successfully!', 'success', 'Photo Updated');
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    removeAvatar();
    addToast('Profile avatar restored to default.', 'info', 'Photo Removed');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-700/80 px-4 sm:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left Section: Mobile Menu Toggle & Brand / Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-base">CampusAI</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">OS v2.4</span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Smart Campus Management System</p>
            </div>
          </div>
        </div>

        {/* Middle Section: Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search students, faculty, courses, events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all"
            />
          </form>
        </div>

        {/* Right Section: Actions, AI Launcher, Notifications, Theme & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick AI Assistant Button */}
          <button
            onClick={() => setActiveTab('ai-assistant')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xs hover:shadow transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI Assistant</span>
          </button>

          {/* Project Info Button */}
          <button
            onClick={onOpenAboutModal}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="About Project & Stack"
          >
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Dark/Light mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-800 animate-ping" />
              )}
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-800" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-3 z-50">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Notifications</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold">{unreadCount}</span>
                  </div>
                  <button 
                    onClick={() => setActiveTab('notifications')}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    View All
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/40">
                  {notifications.slice(0, 4).map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => markNotificationRead(item.id)}
                      className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors ${!item.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <h5 className="text-xs font-semibold text-slate-900 dark:text-slate-100">{item.title}</h5>
                        <span className="text-[10px] text-slate-400">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{item.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Area */}
          {user ? (
            <div className="relative">
              {/* Hidden File Input for Avatar Upload */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 rounded-full sm:rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <img
                  src={user.avatar || DEFAULT_AVATAR}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/40 shadow-xs flex-shrink-0"
                />
                <div className="hidden md:block text-left leading-tight pr-1">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{user.name}</div>
                  <div className="text-[10px] font-semibold text-slate-400 capitalize">{user.role}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-3 z-50">
                  {/* Profile Header & Avatar Manager */}
                  <div className="px-4 pb-3 border-b border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
                    <div className="relative group flex-shrink-0">
                      <img
                        src={user.avatar || DEFAULT_AVATAR}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/50 shadow-sm"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-slate-900/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                        title="Change Photo"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="overflow-hidden flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <div className="mt-1">
                        <Badge variant={roleColors[user.role]} size="sm">
                          {user.role.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Profile Photo Control Actions */}
                  <div className="px-4 py-2.5 bg-slate-50/70 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-700/60 space-y-1.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Profile Photo</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-xs font-semibold transition-colors"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Change Photo</span>
                      </button>

                      {user.avatar && user.avatar !== DEFAULT_AVATAR && (
                        <button
                          onClick={handleRemovePhoto}
                          className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-xs transition-colors"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Switch Role Quick Actions */}
                  <div className="px-4 py-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Switch Demo Role</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => { switchRole('admin'); setShowProfileMenu(false); }}
                        className={`text-xs px-2.5 py-1.5 rounded-lg text-left font-medium transition-colors ${user.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                      >
                        👑 Admin
                      </button>
                      <button
                        onClick={() => { switchRole('teacher'); setShowProfileMenu(false); }}
                        className={`text-xs px-2.5 py-1.5 rounded-lg text-left font-medium transition-colors ${user.role === 'teacher' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                      >
                        👨‍🏫 Teacher
                      </button>
                      <button
                        onClick={() => { switchRole('student'); setShowProfileMenu(false); }}
                        className={`text-xs px-2.5 py-1.5 rounded-lg text-left font-medium transition-colors ${user.role === 'student' ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                      >
                        🎓 Student
                      </button>
                      <button
                        onClick={() => { switchRole('parent'); setShowProfileMenu(false); }}
                        className={`text-xs px-2.5 py-1.5 rounded-lg text-left font-medium transition-colors ${user.role === 'parent' ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-bold' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'}`}
                      >
                        👨‍👩‍👦 Parent
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-700/60 pt-1 mt-1">
                    <button
                      onClick={() => { logout(); setShowProfileMenu(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setCurrentView('login')}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
