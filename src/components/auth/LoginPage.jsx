import React, { useState } from 'react';
import { useAuth, demoUsers } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import {
  GraduationCap,
  Shield,
  UserCheck,
  BookOpen,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  User,
  KeyRound,
  CheckCircle2,
  Home
} from 'lucide-react';
import { Button } from '../ui/Button';

export const LoginPage = () => {
  const { login, setCurrentView } = useAuth();
  const { addToast } = useToast();

  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState(demoUsers.admin.email);
  const [password, setPassword] = useState('demo1234');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setEmail(demoUsers[roleKey].email);
    setPassword('demo1234');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      login(selectedRole);
      setIsLoading(false);
      addToast(`Successfully signed in as ${demoUsers[selectedRole].name} (${selectedRole.toUpperCase()})`, 'success', 'Welcome Back!');
    }, 600);
  };

  const handleInstantDemoLogin = (roleKey) => {
    login(roleKey);
    addToast(`Signed in instantly as ${demoUsers[roleKey].name}`, 'success', 'Demo Access Granted');
  };

  const roleInfo = {
    admin: { label: 'Admin Portal', color: 'bg-purple-500', desc: 'Full campus control, analytics, faculty & student management' },
    teacher: { label: 'Faculty Portal', color: 'bg-blue-500', desc: 'Class schedules, smart attendance marking & gradebooks' },
    student: { label: 'Student Portal', color: 'bg-emerald-500', desc: 'Course assignments, attendance tracker, fees & AI assistant' },
    parent: { label: 'Parent Portal', color: 'bg-amber-500', desc: 'Child academic progress, attendance reports & tuition fees' }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 sm:p-6 transition-colors">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Side: Brand & Demo Access Banner */}
        <div className="md:col-span-5 bg-slate-900 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-purple-600/30 pointer-events-none" />

          <div className="relative z-10">
            <button
              onClick={() => setCurrentView('landing')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white mb-8 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back to Landing Page</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">CampusAI</h2>
                <p className="text-xs text-blue-400 font-medium">Smart Campus System</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-3">Institutional Sign In</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Access role-tailored dashboards for Administrators, Teachers, Students, and Parents.
            </p>
          </div>

          {/* Demo Access Card */}
          <div className="relative z-10 bg-slate-800/90 rounded-2xl p-4 border border-slate-700/80 backdrop-blur-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Demo Credentials Area
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">Ready</span>
            </div>
            
            <p className="text-[11px] text-slate-300 mb-3 font-medium">Click any role below to pre-fill or sign in immediately:</p>

            <div className="space-y-2">
              {Object.keys(demoUsers).map((rk) => (
                <button
                  key={rk}
                  onClick={() => handleInstantDemoLogin(rk)}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-left border border-slate-600/50 transition-all text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${roleInfo[rk].color}`} />
                    <span className="font-bold text-white capitalize">{rk}</span>
                  </div>
                  <span className="text-[10px] text-blue-300 font-semibold flex items-center gap-1">
                    Instant Sign In <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Choose Login Role</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Select your role to view customized permissions.</p>

            {/* Role Tab Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              {['admin', 'teacher', 'student', 'parent'].map((rk) => (
                <button
                  key={rk}
                  type="button"
                  onClick={() => handleRoleSelect(rk)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                    selectedRole === rk
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {rk}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-xs">
              <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {roleInfo[selectedRole].label} Active
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                {roleInfo[selectedRole].desc}
              </p>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              isLoading={isLoading}
              className="w-full text-sm font-bold py-3 mt-2 shadow-lg shadow-blue-500/20"
            >
              Sign In to Dashboard
            </Button>
          </form>

          <p className="text-[11px] text-center text-slate-400 mt-6">
            Demo Environment • No real passwords required • LocalStorage Enabled
          </p>
        </div>
      </div>
    </div>
  );
};
