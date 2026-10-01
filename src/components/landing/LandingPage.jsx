import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  GraduationCap,
  Sparkles,
  Users,
  CalendarCheck,
  BookOpen,
  Award,
  Calendar,
  Bell,
  BarChart3,
  Bot,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Shield,
  Zap,
  Globe,
  Star,
  Building2,
  Lock,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '../ui/Button';

export const LandingPage = ({ onOpenAboutModal }) => {
  const { login, setCurrentView, setUser } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleExploreDashboard = () => {
    login('admin');
  };

  const faqs = [
    {
      q: "What is the AI Smart Campus Management System?",
      a: "It is an all-in-one digital campus operating system that integrates student administration, teacher workflows, smart attendance tracking, academic gradebooks, fee management, library tracking, and AI-driven predictive insights."
    },
    {
      q: "Can I test different role interfaces during presentation?",
      a: "Yes! The system includes instant one-click login for Admin, Teacher, Student, and Parent roles with full interactive dashboards and realistic demo data."
    },
    {
      q: "How does the AI Assistant & Insights feature work?",
      a: "The built-in Campus AI Assistant provides real-time natural language answers regarding timetables, attendance percentages, upcoming exams, fee receipts, and automated attendance drop anomaly warnings."
    },
    {
      q: "Is data preserved when adding or editing students?",
      a: "Yes. All CRUD operations (adding students, marking attendance, creating events, posting announcements, updating fee statuses) automatically persist in browser localStorage."
    },
    {
      q: "Is this ready for deployment on Netlify?",
      a: "Absolutely. The codebase contains netlify.toml and SPA redirect configurations, enabling 1-click single-command deployment with npm run build."
    }
  ];

  const features = [
    { icon: Users, title: "Student Management", desc: "Comprehensive 360° student profiles, enrollment tracking, search, department filters, and automated status tracking." },
    { icon: CalendarCheck, title: "AI Attendance Insights", desc: "Digital attendance matrix with AI anomaly warnings alerting faculty when course attendance falls below thresholds." },
    { icon: BookOpen, title: "Academic Management", desc: "Manage courses, subjects, credit hours, department catalogs, class timetables, and midterm schedules." },
    { icon: GraduationCap, title: "Teacher Management", desc: "Faculty profiles, course allocations, designation tracking, and automated schedule collision checks." },
    { icon: Calendar, title: "Campus Events", desc: "Interactive campus event calendar, hackathons, symposiums, innovation expos, and venue booking." },
    { icon: Bell, title: "Smart Notifications", desc: "Category-filtered alert center for midterms, pending fees, emergency notices, and library due dates." },
    { icon: BarChart3, title: "Analytics Dashboard", desc: "Rich graphical visualizer for student enrollment trends, fee collection status, and GPA breakdowns." },
    { icon: Bot, title: "Campus AI Assistant", desc: "Conversational AI assistant answering student & faculty queries on schedules, grades, and campus facilities." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-blue-500 selection:text-white">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">SmartCampus<span className="text-blue-600 dark:text-blue-400">.AI</span></span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How It Works</a>
            <a href="#ai-spotlight" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI Spotlight</a>
            <a href="#modules" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Modules</a>
            <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
            <Button variant="outline" size="sm" onClick={() => setCurrentView('login')}>
              Demo Login
            </Button>
            <Button variant="gradient" size="sm" onClick={handleExploreDashboard}>
              Explore Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold mb-8 shadow-sm">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
            <span>Next-Generation AI Campus Operating System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-6">
            AI Smart Campus <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Management System</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            One intelligent platform to manage students, academics, attendance, communication and campus operations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="gradient"
              size="lg"
              icon={ArrowRight}
              onClick={handleExploreDashboard}
              className="w-full sm:w-auto text-base px-8 py-3.5 shadow-xl shadow-blue-500/20"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={Zap}
              onClick={() => setCurrentView('login')}
              className="w-full sm:w-auto text-base px-8 py-3.5"
            >
              Explore Demo Roles
            </Button>
          </div>

          {/* Interactive Live Preview Mockup Card */}
          <div className="mt-14 p-2 bg-gradient-to-b from-slate-200 dark:from-slate-700 to-transparent rounded-3xl shadow-2xl">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 overflow-hidden border border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="text-xs text-slate-400 font-mono">https://campus.university.edu/admin/dashboard</div>
                <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live Demo
                </div>
              </div>

              {/* Mockup Quick Preview Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Total Students</p>
                  <p className="text-2xl font-extrabold text-white mt-1">2,450</p>
                  <p className="text-[10px] text-emerald-400 font-semibold mt-1">↑ +12.4% this year</p>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Faculty Members</p>
                  <p className="text-2xl font-extrabold text-white mt-1">185</p>
                  <p className="text-[10px] text-blue-400 font-semibold mt-1">42 Departments</p>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Attendance Rate</p>
                  <p className="text-2xl font-extrabold text-emerald-400 mt-1">96.0%</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">AI Verified</p>
                </div>
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Fee Collection</p>
                  <p className="text-2xl font-extrabold text-purple-400 mt-1">$4.2M</p>
                  <p className="text-[10px] text-emerald-400 font-semibold mt-1">92% Collected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white dark:bg-slate-800/50 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">2,450</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Active Students</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">185</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Expert Faculty</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400">42</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Academic Departments</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">96.0%</h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Campus Attendance Rate</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Built for Modern Educational Excellence
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
            Designed to empower university administrators, teachers, students, and parents with seamless digital tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-slate-100/70 dark:bg-slate-800/30 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">How It Works</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Unified workflow connecting every stakeholder on campus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Select Role", desc: "Login as Admin, Faculty, Student or Parent with instant role demo credentials." },
              { step: "02", title: "Smart Operations", desc: "Manage admissions, attendance, exams, fees, library books and facility bookings." },
              { step: "03", title: "AI Analytics", desc: "AI engine generates real-time predictive insights on student risk & performance." },
              { step: "04", title: "Live Insights", desc: "Export reports, track fee invoices, and interact via the Campus AI Assistant." }
            ].map((st, i) => (
              <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden">
                <span className="text-4xl font-black text-blue-500/20 dark:text-blue-400/20 absolute right-4 top-4">{st.step}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{st.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Spotlight */}
      <section id="ai-spotlight" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Intelligent Assistance Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Powered by Next-Gen Campus AI Assistant
            </h2>
            <p className="text-sm text-indigo-200 leading-relaxed mb-6">
              Ask natural language questions about timetable schedules, exam dates, attendance drops, library due dates, or GPA transcripts. The assistant delivers instantaneous contextual responses tailored to your logged-in role.
            </p>
            <Button variant="gradient" size="md" icon={Bot} onClick={handleExploreDashboard}>
              Try AI Assistant Now
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-slate-800/40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">What Deans & Faculty Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: "The AI Attendance Insights reduced our department drop-out rate by 14% by catching attendance drops early.", name: "Dr. Robert Vance", role: "Head of Computer Science" },
              { quote: "Managing 450+ student tuition fee invoices used to take weeks. Now it takes 1 click with full persistence.", name: "Dr. Emily Thorne", role: "Dean of Business Administration" },
              { quote: "Students love the Campus AI Assistant. They get immediate answers on class schedules and exam room allocations.", name: "Dr. Sarah Jenkins", role: "Associate Professor, Data Science" }
            ].map((t, idx) => (
              <div key={idx} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 italic mb-4">"{t.quote}"</p>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-bold text-sm text-slate-900 dark:text-white focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-base mb-3">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              <span>SmartCampus AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete, modern university class project designed for live presentation and Netlify deployment.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Modules</h4>
            <ul className="space-y-2">
              <li>Student Management</li>
              <li>Faculty Directory</li>
              <li>Smart Attendance</li>
              <li>Academic Grades</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">AI Engine</h4>
            <ul className="space-y-2">
              <li>AI Attendance Anomaly Alert</li>
              <li>Campus AI Assistant Chat</li>
              <li>Student Risk Predictor</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Presentation Ready</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Built with React, Vite, Tailwind CSS, Recharts, and LocalStorage persistence.
            </p>
            <button 
              onClick={onOpenAboutModal}
              className="text-xs text-blue-400 font-bold hover:underline"
            >
              View About Project & Technical Spec
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AI Smart Campus Management System. Class Project Edition.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('login')} className="hover:text-white">Demo Credentials</button>
            <button onClick={handleExploreDashboard} className="hover:text-white">Admin Dashboard</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
