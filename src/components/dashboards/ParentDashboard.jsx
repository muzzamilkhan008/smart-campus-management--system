import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Users,
  CalendarCheck,
  Award,
  CreditCard,
  Sparkles,
  CheckCircle2,
  Megaphone,
  PhoneCall
} from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const ParentDashboard = () => {
  const { user, setActiveTab } = useAuth();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-100 text-xs font-bold mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Parent Guardian Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Parent Overview: Alex Morgan
            </h1>
            <p className="text-xs sm:text-sm text-amber-100 mt-1">
              Child ID: STU-1001 • B.Tech Computer Science • Semester 6
            </p>
          </div>

          <Button
            variant="gradient"
            size="md"
            icon={CreditCard}
            onClick={() => setActiveTab('fees')}
            className="bg-white text-amber-900 hover:bg-amber-50 font-bold"
          >
            View Fee Statement
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Child Attendance"
          value="94.5%"
          change="38/40 Days"
          changeType="positive"
          icon={CalendarCheck}
          color="emerald"
          description="Consistent Attendance"
        />
        <StatCard
          title="Current CGPA"
          value="3.85 / 4.0"
          change="Grade A"
          changeType="positive"
          icon={Award}
          color="blue"
          description="Top 5% Cohort"
        />
        <StatCard
          title="Tuition Fees"
          value="PAID IN FULL"
          change="$4,500"
          changeType="positive"
          icon={CreditCard}
          color="indigo"
          description="Semester 6 Cleared"
        />
        <StatCard
          title="Advisor Contact"
          value="Dr. R. Vance"
          change="Available"
          changeType="positive"
          icon={PhoneCall}
          color="purple"
          description="HOD Computer Science"
        />
      </div>

      {/* Academic Reports & Campus Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle icon={Award}>Semester 6 Academic Results</CardTitle>
            <Badge variant="emerald">Grade Report</Badge>
          </CardHeader>
          <CardContent className="divide-y divide-slate-100 dark:divide-slate-700/50 text-xs">
            <div className="py-3 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">CS-301 Algorithm Analysis & Design</h4>
                <p className="text-slate-500">Instructor: Dr. Robert Vance</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Grade: A</span>
                <p className="text-[10px] text-slate-400">Score: 92/100</p>
              </div>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">CS-405 Artificial Intelligence & Robotics</h4>
                <p className="text-slate-500">Instructor: Dr. Robert Vance</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Grade: A-</span>
                <p className="text-[10px] text-slate-400">Score: 89/100</p>
              </div>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">DS-201 Machine Learning Fundamentals</h4>
                <p className="text-slate-500">Instructor: Dr. Sarah Jenkins</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">Grade: A</span>
                <p className="text-[10px] text-slate-400">Score: 95/100</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notices */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle icon={Megaphone}>Official Parent Notices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">Oct 18, 2026</span>
              <h5 className="font-bold text-slate-900 dark:text-white mt-1">Mid-Term Examinations Begin</h5>
              <p className="text-slate-500 mt-1">Examinations will take place from Oct 18th to Oct 25th.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
