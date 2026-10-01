import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Award,
  CalendarCheck,
  BookOpen,
  CreditCard,
  Sparkles,
  Bot,
  CheckCircle2,
  Calendar,
  BookMarked
} from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const StudentDashboard = () => {
  const { user, setActiveTab } = useAuth();
  const { courses, books, events } = useData();

  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-bold mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Student Academic Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Alex Morgan'}!
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              B.Tech Computer Science • Semester 6 • Section A • ID: STU-1001
            </p>
          </div>

          <Button
            variant="gradient"
            size="md"
            icon={Bot}
            onClick={() => setActiveTab('ai-assistant')}
            className="bg-white text-emerald-800 hover:bg-emerald-50 font-bold"
          >
            Ask AI Assistant
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Cumulative GPA"
          value="3.85 / 4.0"
          change="Top 5%"
          changeType="positive"
          icon={Award}
          color="emerald"
          description="Deans Honors List"
        />
        <StatCard
          title="Overall Attendance"
          value="94.5%"
          change="38/40 classes"
          changeType="positive"
          icon={CalendarCheck}
          color="blue"
          description="Good Standing"
        />
        <StatCard
          title="Enrolled Courses"
          value="5 Courses"
          change="18 Credits"
          changeType="positive"
          icon={BookOpen}
          color="purple"
          description="Fall 2026"
        />
        <StatCard
          title="Tuition Fees"
          value="PAID"
          change="Receipt #0910"
          changeType="positive"
          icon={CreditCard}
          color="indigo"
          description="Semester 6 Paid"
        />
      </div>

      {/* Today's Schedule & Quick AI Launcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle icon={BookOpen}>Today's Class Timetable</CardTitle>
            <Badge variant="emerald">2 Lectures Today</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">10:00 AM - 11:30 AM</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">CS-301 Algorithm Analysis & Design</h4>
                <p className="text-xs text-slate-500">Instructor: Dr. Robert Vance • Tech Block Room 401</p>
              </div>
              <Badge variant="blue">Attended</Badge>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400">02:00 PM - 03:30 PM</span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">CS-405 Artificial Intelligence & Robotics</h4>
                <p className="text-xs text-slate-500">Instructor: Dr. Robert Vance • Tech Block Room 405</p>
              </div>
              <Badge variant="amber">Upcoming</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Library & Upcoming Events */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle icon={BookMarked}>My Library Loans</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
              <h5 className="font-bold text-slate-900 dark:text-white">Artificial Intelligence: A Modern Approach</h5>
              <p className="text-[11px] text-slate-500 mt-0.5">Due Date: Oct 03, 2026 (2 days left)</p>
              <div className="mt-2 flex items-center justify-between">
                <Badge variant="amber" size="sm">Issued Out</Badge>
                <button onClick={() => setActiveTab('library')} className="text-blue-600 hover:underline font-bold text-[11px]">Renew Book</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
