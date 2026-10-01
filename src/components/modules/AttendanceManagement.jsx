import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  CalendarCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Sparkles,
  UserCheck,
  BarChart2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { StatCard } from '../ui/StatCard';

export const AttendanceManagement = () => {
  const { students, attendance, markAttendanceRecord, courses, departments } = useData();
  const { addToast } = useToast();

  const [selectedDate, setSelectedDate] = useState('2026-10-01');
  const [selectedCourse, setSelectedCourse] = useState('CS-301');
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleMarkStatus = (studentId, status) => {
    markAttendanceRecord(studentId, selectedCourse, status, selectedDate);
    addToast(`Marked ${status} for student ${studentId}`, 'success', 'Attendance Recorded');
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || s.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  // Get current status map for selected date & course
  const currentAttendanceMap = {};
  attendance.forEach(rec => {
    if (rec.courseCode === selectedCourse && rec.date === selectedDate) {
      currentAttendanceMap[rec.studentId] = rec.status;
    }
  });

  // Calculate statistics
  const totalInFilter = filteredStudents.length;
  const presentCount = filteredStudents.filter(s => currentAttendanceMap[s.id] === 'Present').length;
  const absentCount = filteredStudents.filter(s => currentAttendanceMap[s.id] === 'Absent').length;
  const lateCount = filteredStudents.filter(s => currentAttendanceMap[s.id] === 'Late').length;

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span>Smart Attendance Management & AI Insights</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time digital attendance marking, automated status logs, and predictive risk insights.
          </p>
        </div>
      </div>

      {/* AI Smart Insights Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg border border-indigo-700/60 relative overflow-hidden">
        <div className="flex items-start gap-3 relative z-10">
          <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30 flex-shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white">Campus AI Attendance Insights</h3>
              <Badge variant="purple" size="sm">Smart Engine</Badge>
            </div>
            <p className="text-xs text-blue-200 leading-relaxed">
              • Attendance in <span className="font-bold text-white">Computer Science</span> decreased by 4.2% this week.<br />
              • <span className="font-bold text-amber-300">12 students</span> across departments have dropped below the 75% mandatory threshold and require administrative follow-up.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Enrolled" value={totalInFilter} icon={UserCheck} color="blue" description="In selected filter" />
        <StatCard title="Present Today" value={presentCount} change={`${Math.round((presentCount/totalInFilter)*100 || 0)}%`} changeType="positive" icon={CheckCircle2} color="emerald" description="Verified Present" />
        <StatCard title="Absent Today" value={absentCount} change={`${absentCount} Students`} changeType="negative" icon={XCircle} color="rose" description="Requires Excuse" />
        <StatCard title="Late Arrivals" value={lateCount} icon={Clock} color="amber" description="Logged after 10 mins" />
      </div>

      {/* Filter & Control Controls */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Course / Class</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                {courses.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)}
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Department</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                <option value="All">All Departments</option>
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Search Student</label>
              <input
                type="text"
                placeholder="Search name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Matrix Table */}
      <Card>
        <CardHeader>
          <CardTitle icon={UserCheck}>Class Attendance Register: {selectedCourse} ({selectedDate})</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Overall %</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-center">Mark Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-xs font-medium">
              {filteredStudents.map(stu => {
                const currentStatus = currentAttendanceMap[stu.id] || 'Not Marked';
                return (
                  <tr key={stu.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={stu.avatar} alt={stu.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{stu.name}</div>
                          <div className="text-[10px] text-slate-400">{stu.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">{stu.id}</td>
                    <td className="py-3 px-4">{stu.department}</td>
                    <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">{stu.attendance}%</td>
                    <td className="py-3 px-4">
                      <Badge variant={
                        currentStatus === 'Present' ? 'emerald' :
                        currentStatus === 'Absent' ? 'rose' :
                        currentStatus === 'Late' ? 'amber' : 'slate'
                      } size="sm">
                        {currentStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleMarkStatus(stu.id, 'Present')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            currentStatus === 'Present'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleMarkStatus(stu.id, 'Absent')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            currentStatus === 'Absent'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-100 dark:hover:bg-rose-900/40'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleMarkStatus(stu.id, 'Late')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            currentStatus === 'Late'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-900/40'
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
