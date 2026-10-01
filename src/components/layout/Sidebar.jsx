import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  Award,
  Calendar,
  Bell,
  Megaphone,
  CreditCard,
  BookMarked,
  HelpCircle,
  Building2,
  BarChart3,
  Sparkles,
  LogOut,
  RefreshCw,
  Home
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export const Sidebar = () => {
  const { user, activeTab, setActiveTab, logout, setCurrentView } = useAuth();
  const { resetDemoData } = useData();

  if (!user) return null;

  const role = user.role || 'admin';

  // Navigation Items per role
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
      { id: 'ai-assistant', label: 'Campus AI Assistant', icon: Sparkles, badge: 'AI' }
    ],
    teacher: [
      { id: 'dashboard', label: 'Faculty Overview', icon: LayoutDashboard },
      { id: 'students', label: 'Enrolled Students', icon: Users },
      { id: 'attendance', label: 'Mark Attendance', icon: CalendarCheck },
      { id: 'academics', label: 'My Courses & Schedules', icon: BookOpen },
      { id: 'grades', label: 'Gradebook & Exams', icon: Award },
      { id: 'announcements', label: 'Post Announcements', icon: Megaphone },
      { id: 'events', label: 'Campus Events', icon: Calendar },
      { id: 'ai-assistant', label: 'Campus AI Assistant', icon: Sparkles, badge: 'AI' }
    ],
    student: [
      { id: 'dashboard', label: 'Student Portal', icon: LayoutDashboard },
      { id: 'academics', label: 'My Courses & Schedule', icon: BookOpen },
      { id: 'attendance', label: 'My Attendance', icon: CalendarCheck },
      { id: 'grades', label: 'My Grades & GPA', icon: Award },
      { id: 'fees', label: 'Tuition Fees', icon: CreditCard },
      { id: 'events', label: 'Campus Events', icon: Calendar },
      { id: 'library', label: 'Library Books', icon: BookMarked },
      { id: 'support', label: 'Support & Tickets', icon: HelpCircle },
      { id: 'ai-assistant', label: 'Campus AI Assistant', icon: Sparkles, badge: 'AI' }
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
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-65px)] border-r border-slate-800 p-4 select-none flex-shrink-0">
      {/* Role Indicator Banner */}
      <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-800/60 border border-slate-700/60 flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-500/50"
        />
        <div className="overflow-hidden">
          <h4 className="text-xs font-bold text-white truncate">{user.name}</h4>
          <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">{role} View</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Main Navigation</p>
        
        {/* Landing Home Link */}
        <button
          onClick={() => setCurrentView('landing')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          <Home className="w-4 h-4 text-slate-400" />
          <span>Public Landing Page</span>
        </button>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-purple-500/30 text-purple-300 border border-purple-400/40">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Controls */}
      <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
        <button
          onClick={() => {
            if (window.confirm("Reset all data back to original demo state?")) {
              resetDemoData();
            }
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] font-semibold text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
          title="Reset LocalStorage Demo Data"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[11px] font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
