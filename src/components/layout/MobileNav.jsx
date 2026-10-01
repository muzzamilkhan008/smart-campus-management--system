import React from 'react';
import { useAuth, DEFAULT_AVATAR } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  X,
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  Award,
  Calendar,
  Megaphone,
  CreditCard,
  BookMarked,
  HelpCircle,
  Building2,
  BarChart3,
  Sparkles,
  Home,
  LogOut,
  RefreshCw
} from 'lucide-react';

export const MobileNav = ({ isOpen, onClose }) => {
  const { user, activeTab, setActiveTab, logout, setCurrentView } = useAuth();
  const { resetDemoData } = useData();

  if (!isOpen || !user) return null;

  const role = user.role || 'admin';

  const menuConfig = {
    admin: [
      { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
      { id: 'students', label: 'Student Directory', icon: Users },
      { id: 'teachers', label: 'Faculty Directory', icon: GraduationCap },
      { id: 'attendance', label: 'Smart Attendance', icon: CalendarCheck },
      { id: 'academics', label: 'Academic Courses', icon: BookOpen },
      { id: 'grades', label: 'Grades & Results', icon: Award },
      { id: 'events', label: 'Campus Events', icon: Calendar },
      { id: 'announcements', label: 'Announcements', icon: Megaphone },
      { id: 'fees', label: 'Fees & Finance', icon: CreditCard },
      { id: 'library', label: 'Library Catalog', icon: BookMarked },
      { id: 'support', label: 'Helpdesk & Support', icon: HelpCircle },
      { id: 'facilities', label: 'Campus Facilities', icon: Building2 },
      { id: 'analytics', label: 'Campus Analytics', icon: BarChart3 },
      { id: 'ai-assistant', label: 'Campus AI Assistant', icon: Sparkles }
    ],
    teacher: [
      { id: 'dashboard', label: 'Faculty Overview', icon: LayoutDashboard },
      { id: 'students', label: 'Enrolled Students', icon: Users },
      { id: 'attendance', label: 'Mark Attendance', icon: CalendarCheck },
      { id: 'academics', label: 'My Courses & Schedules', icon: BookOpen },
      { id: 'grades', label: 'Gradebook & Exams', icon: Award },
      { id: 'announcements', label: 'Post Announcements', icon: Megaphone },
      { id: 'events', label: 'Campus Events', icon: Calendar },
      { id: 'ai-assistant', label: 'Campus AI Assistant', icon: Sparkles }
    ],
    student: [
      { id: 'dashboard', label: 'Student Portal', icon: LayoutDashboard },
      { id: 'academics', label: 'My Courses', icon: BookOpen },
      { id: 'attendance', label: 'My Attendance', icon: CalendarCheck },
      { id: 'grades', label: 'My Grades & GPA', icon: Award },
      { id: 'fees', label: 'Tuition Fees', icon: CreditCard },
      { id: 'events', label: 'Campus Events', icon: Calendar },
      { id: 'library', label: 'Library Books', icon: BookMarked },
      { id: 'support', label: 'Support & Tickets', icon: HelpCircle },
      { id: 'ai-assistant', label: 'Campus AI Assistant', icon: Sparkles }
    ],
    parent: [
      { id: 'dashboard', label: 'Parent Portal', icon: LayoutDashboard },
      { id: 'attendance', label: 'Child Attendance', icon: CalendarCheck },
      { id: 'grades', label: 'Academic Progress', icon: Award },
      { id: 'fees', label: 'Fee Payments', icon: CreditCard },
      { id: 'announcements', label: 'Campus Notices', icon: Megaphone },
      { id: 'events', label: 'Upcoming Events', icon: Calendar }
    ]
  };

  const navItems = menuConfig[role] || menuConfig.admin;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative flex flex-col w-4/5 max-w-xs bg-slate-900 text-slate-300 h-full p-4 shadow-2xl z-10 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-base">CampusAI Navigation</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="my-4 p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-3">
          <img src={user.avatar || DEFAULT_AVATAR} alt={user.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/50 flex-shrink-0" />
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">{user.name}</h4>
            <p className="text-[10px] text-blue-400 font-semibold uppercase">{role}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <button
            onClick={() => { setCurrentView('landing'); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800"
          >
            <Home className="w-4 h-4" />
            <span>Public Landing Page</span>
          </button>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                  isActive ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => { resetDemoData(); onClose(); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-400 hover:bg-slate-800"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Demo Data</span>
          </button>
          <button
            onClick={() => { logout(); onClose(); }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
