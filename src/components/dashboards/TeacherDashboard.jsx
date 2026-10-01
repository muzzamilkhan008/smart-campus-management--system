import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  BookOpen,
  CalendarCheck,
  Users,
  Award,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const TeacherDashboard = () => {
  const { user, setActiveTab } = useAuth();
  const { courses, students, attendance } = useData();

  const myCourses = courses.filter(c => c.instructor.includes("Vance") || c.instructor.includes(user?.name || ''));

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Faculty Command Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Dr. Vance'}!
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              Department of Computer Science • Office: Tech Block Room 402
            </p>
          </div>

          <Button
            variant="gradient"
            size="md"
            icon={CalendarCheck}
            onClick={() => setActiveTab('attendance')}
            className="bg-white text-blue-700 hover:bg-blue-50 font-bold"
          >
            Mark Class Attendance
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Assigned Courses"
          value={myCourses.length > 0 ? myCourses.length : 2}
          change="Fall 2026"
          changeType="positive"
          icon={BookOpen}
          color="blue"
          description="CS-301 & CS-405"
        />
        <StatCard
          title="Total Students Enrolled"
          value="122"
          change="Active"
          changeType="positive"
          icon={Users}
          color="indigo"
          description="64 in CS-301, 58 in CS-405"
        />
        <StatCard
          title="Average Course Attendance"
          value="94.5%"
          change="+2.1%"
          changeType="positive"
          icon={CalendarCheck}
          color="emerald"
          description="This semester"
        />
        <StatCard
          title="Upcoming Midterms"
          value="2 Papers"
          change="Oct 18th"
          changeType="positive"
          icon={Award}
          color="purple"
          description="Hall A & B"
        />
      </div>

      {/* AI Class Insight Alert */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
        <div className="p-2 bg-amber-100 dark:bg-amber-900/60 rounded-xl text-amber-600 dark:text-amber-300 flex-shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-amber-900 dark:text-amber-100 flex items-center gap-1.5">
            <span>AI Attendance Insight Warning</span>
            <Badge variant="amber" size="sm">Demo AI</Badge>
          </h4>
          <p className="text-xs text-amber-800 dark:text-amber-300 mt-0.5">
            Attendance in CS-301 decreased by 4.2% this week. 2 students (Daniel Kovacs, Marcus Vance) require follow-up.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setActiveTab('attendance')}>
          View Attendance
        </Button>
      </div>

      {/* Course List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myCourses.map((c, i) => (
          <Card key={i} hover onClick={() => setActiveTab('academics')}>
            <CardHeader>
              <div>
                <Badge variant="blue" size="sm">{c.code}</Badge>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{c.name}</h3>
              </div>
              <Badge variant="emerald">{c.enrolled} Students</Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-500" /> Schedule:</span>
                <span className="font-semibold">{c.schedule}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-purple-500" /> Room Location:</span>
                <span className="font-semibold">{c.room}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
