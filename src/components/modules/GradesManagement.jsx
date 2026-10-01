import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  Award,
  Search,
  Plus,
  BarChart2,
  TrendingUp,
  FileText,
  UserCheck
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

export const GradesManagement = () => {
  const { students, courses } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [isAddGradeModalOpen, setIsAddGradeModalOpen] = useState(false);

  const gradeDistribution = [
    { grade: 'A (4.0)', count: 84, color: '#10b981' },
    { grade: 'A- (3.7)', count: 62, color: '#3b82f6' },
    { grade: 'B+ (3.3)', count: 45, color: '#8b5cf6' },
    { grade: 'B (3.0)', count: 30, color: '#f59e0b' },
    { grade: 'C+ (2.3)', count: 12, color: '#06b6d4' },
    { grade: 'C / F', count: 5, color: '#ef4444' }
  ];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            <span>Grades & Academic Performance Center</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Gradebook, GPA calculator, semester transcripts, and performance distribution analytics.
          </p>
        </div>
        <Button variant="gradient" icon={Plus} onClick={() => setIsAddGradeModalOpen(true)}>
          Enter Marks & Grades
        </Button>
      </div>

      {/* Grade Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle icon={BarChart2}>Campus Grade Breakdown Distribution</CardTitle>
            <Badge variant="purple">Fall 2026 Semester</Badge>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="grade" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '11px' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle icon={TrendingUp}>GPA Grading Scale System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Grade A (90 - 100%)</span>
              <span className="font-mono font-bold">4.0 GPA Point</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
              <span className="font-bold text-blue-600 dark:text-blue-400">Grade A- (85 - 89%)</span>
              <span className="font-mono font-bold">3.7 GPA Point</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
              <span className="font-bold text-purple-600 dark:text-purple-400">Grade B+ (80 - 84%)</span>
              <span className="font-mono font-bold">3.3 GPA Point</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
              <span className="font-bold text-amber-600 dark:text-amber-400">Grade B (75 - 79%)</span>
              <span className="font-mono font-bold">3.0 GPA Point</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50">
              <span className="font-bold text-rose-600 dark:text-rose-400">Grade C / F (&lt; 70%)</span>
              <span className="font-mono font-bold">2.0 / 0.0 GPA</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Transcript Gradebook Table */}
      <Card>
        <CardHeader>
          <CardTitle icon={FileText}>Student Cumulative Gradebook</CardTitle>
          <div className="w-64 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-[11px] font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Semester</th>
                <th className="py-3 px-4">Cumulative CGPA</th>
                <th className="py-3 px-4">Letter Grade</th>
                <th className="py-3 px-4 text-right">Academic Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-xs font-medium">
              {filteredStudents.map(stu => {
                const gradeLetter = stu.cgpa >= 3.8 ? 'A' : stu.cgpa >= 3.5 ? 'A-' : stu.cgpa >= 3.0 ? 'B+' : stu.cgpa >= 2.5 ? 'B' : 'C';
                return (
                  <tr key={stu.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={stu.avatar} alt={stu.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{stu.name}</div>
                          <div className="text-[10px] text-slate-400">{stu.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{stu.department}</td>
                    <td className="py-3 px-4">{stu.semester}</td>
                    <td className="py-3 px-4 font-extrabold text-blue-600 dark:text-blue-400">{stu.cgpa.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={gradeLetter === 'A' || gradeLetter === 'A-' ? 'emerald' : gradeLetter === 'B+' ? 'purple' : 'amber'} size="sm">
                        Grade {gradeLetter}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant={stu.cgpa >= 3.5 ? 'blue' : 'slate'} size="sm">
                        {stu.cgpa >= 3.5 ? 'Deans List' : 'Good Standing'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Modal isOpen={isAddGradeModalOpen} onClose={() => setIsAddGradeModalOpen(false)} title="Record Student Grade">
        <form onSubmit={(e) => {
          e.preventDefault();
          setIsAddGradeModalOpen(false);
          addToast("Student grade successfully recorded into transcripts!", "success", "Grade Entered");
        }} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1">Select Student</label>
            <select className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.id})</option>)}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Score / Percentage (0-100)</label>
            <input type="number" required defaultValue="92" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700" />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t">
            <Button variant="secondary" onClick={() => setIsAddGradeModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">Submit Grade</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
