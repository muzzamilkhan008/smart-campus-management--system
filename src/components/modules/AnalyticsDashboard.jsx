import React, { useState } from 'react';
import { analyticsData } from '../../data/initialData';
import { BarChart3, Filter, TrendingUp, Calendar, DollarSign, Award, Users } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
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
  Cell
} from 'recharts';

export const AnalyticsDashboard = () => {
  const [dateFilter, setDateFilter] = useState('This Semester');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <span>Executive Campus Analytics Hub</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deep dive data visualization on student enrollment, attendance rates, fee collection, and performance.
          </p>
        </div>

        {/* Date Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          {['Today', 'This Week', 'This Month', 'This Semester', 'This Year'].map(df => (
            <button
              key={df}
              onClick={() => setDateFilter(df)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                dateFilter === df
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {df}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Attendance Trends Bar Chart */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle icon={TrendingUp}>Weekly Attendance Rate by Department (%)</CardTitle>
            <Badge variant="emerald">{dateFilter}</Badge>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.attendanceTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[80, 100]} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                <Bar dataKey="CS" fill="#3b82f6" name="Computer Science" radius={[4, 4, 0, 0]} />
                <Bar dataKey="DS" fill="#8b5cf6" name="Data Science & AI" radius={[4, 4, 0, 0]} />
                <Bar dataKey="EE" fill="#f59e0b" name="Electrical Eng" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution Pie */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle icon={Users}>Department Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={analyticsData.departmentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
