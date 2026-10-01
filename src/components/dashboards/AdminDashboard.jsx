import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  Users,
  GraduationCap,
  Building2,
  CalendarCheck,
  CreditCard,
  Calendar,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Megaphone,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { analyticsData } from '../../data/initialData';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const AdminDashboard = () => {
  const { user, setActiveTab } = useAuth();
  const { students, teachers, departments, events, announcements, fees } = useData();
  const { addToast } = useToast();

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalDepts = departments.length;
  const upcomingEventsCount = events.length;

  const recentActivities = [
    { id: 1, text: "Alex Morgan paid tuition fees for Semester 6", type: "Fee", time: "10 mins ago", color: "emerald" },
    { id: 2, text: "Dr. Sarah Jenkins submitted grades for DS-201", type: "Grade", time: "25 mins ago", color: "blue" },
    { id: 3, text: "New announcement posted: 'Library 24/7 Opening'", type: "Notice", time: "1 hour ago", color: "amber" },
    { id: 4, text: "Event created: 'Annual AI & Robotics Summit'", type: "Event", time: "2 hours ago", color: "purple" },
    { id: 5, text: "Marcus Vance marked present in EE-102", type: "Attendance", time: "3 hours ago", color: "emerald" }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> System Administration Control Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Administrator'}!
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
              All campus systems operational. Attendance average is 96.0% with 6 active departments and 15 courses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="gradient"
              size="md"
              icon={Plus}
              onClick={() => setActiveTab('students')}
              className="bg-white text-blue-700 hover:bg-blue-50 shadow-md font-bold"
            >
              Add Student
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={Megaphone}
              onClick={() => setActiveTab('announcements')}
              className="border-white/40 text-white hover:bg-white/10"
            >
              Announcement
            </Button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={totalStudents}
          change="+12.5%"
          changeType="positive"
          icon={Users}
          color="blue"
          description="Across all departments"
        />
        <StatCard
          title="Total Teachers"
          value={totalTeachers}
          change="+4"
          changeType="positive"
          icon={GraduationCap}
          color="indigo"
          description="Active faculty staff"
        />
        <StatCard
          title="Departments"
          value={totalDepts}
          change="6 Active"
          changeType="positive"
          icon={Building2}
          color="purple"
          description="CS, DS, EE, MGT, ME, BIO"
        />
        <StatCard
          title="Attendance Rate"
          value="96.0%"
          change="+1.2%"
          changeType="positive"
          icon={CalendarCheck}
          color="emerald"
          description="AI monitored average"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Enrollment Trend Chart */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle icon={TrendingUp}>Student Enrollment & Department Trends</CardTitle>
            <Badge variant="blue">Historical Data</Badge>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.enrollmentTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="ComputerScience" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCS)" name="CS Dept" />
                <Area type="monotone" dataKey="DataScience" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorDS)" name="DS & AI Dept" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution Pie Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle icon={Building2}>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={analyticsData.departmentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {analyticsData.departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-slate-100 dark:border-slate-700/60">
              {analyticsData.departmentDistribution.map((d, i) => (
                <div key={i} className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="truncate">{d.name}: {d.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Quick Actions Panel */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle icon={Sparkles}>Admin Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              onClick={() => setActiveTab('students')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100 hover:bg-blue-100 transition-colors text-xs font-bold"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Manage & Add Students</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-blue-500" />
            </button>

            <button
              onClick={() => setActiveTab('teachers')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-100 hover:bg-indigo-100 transition-colors text-xs font-bold"
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Add & Assign Faculty</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-indigo-500" />
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100 hover:bg-purple-100 transition-colors text-xs font-bold"
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>Create Campus Event</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-purple-500" />
            </button>

            <button
              onClick={() => setActiveTab('fees')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-100 transition-colors text-xs font-bold"
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Manage Fees & Financials</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            </button>
          </CardContent>
        </Card>

        {/* Recent Activity Log */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle icon={FileText}>Live Campus Activity Stream</CardTitle>
            <Badge variant="emerald" size="sm">Real-Time Log</Badge>
          </CardHeader>
          <CardContent className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {recentActivities.map(act => (
              <div key={act.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full bg-${act.color}-500`} />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{act.text}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={act.color} size="sm">{act.type}</Badge>
                  <span className="text-[11px] text-slate-400 font-mono">{act.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
