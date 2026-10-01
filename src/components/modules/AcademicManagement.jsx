import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  BookOpen,
  Building2,
  Calendar,
  Clock,
  Users,
  Search,
  Plus,
  FileText,
  Award
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

export const AcademicManagement = () => {
  const { courses, departments } = useData();
  const { addToast } = useToast();

  const [activeSubTab, setActiveSubTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <span>Academic Management</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse campus courses, departments, timetables, exams, and syllabus schedules.
          </p>
        </div>
        <Button variant="gradient" icon={Plus} onClick={() => setIsAddCourseModalOpen(true)}>
          Add Course
        </Button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
        {['courses', 'departments', 'timetable'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              activeSubTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeSubTab === 'courses' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses by code, title, or instructor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(c => (
              <Card key={c.code} hover>
                <CardHeader>
                  <div>
                    <Badge variant="blue" size="sm">{c.code}</Badge>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{c.name}</h3>
                  </div>
                  <Badge variant="emerald">{c.credits} Credits</Badge>
                </CardHeader>
                <CardContent className="space-y-2.5 text-xs">
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    Instructor: <span className="font-bold text-slate-900 dark:text-white">{c.instructor}</span>
                  </p>
                  <p className="text-slate-500">Department: {c.department}</p>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200/60 dark:border-slate-700 space-y-1">
                    <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-blue-500" /> {c.schedule}
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-500">
                      <Building2 className="w-3.5 h-3.5 text-purple-500" /> Room: {c.room}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-400 font-semibold">{c.enrolled} Students Enrolled</span>
                    <Badge variant="purple" size="sm">Semester {c.semester}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'departments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map(dept => (
            <Card key={dept.id}>
              <CardHeader>
                <div>
                  <Badge variant="purple" size="sm">{dept.code}</Badge>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{dept.name}</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <p><span className="font-semibold text-slate-500">Department Head:</span> {dept.head}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-bold">
                    {dept.studentsCount} Students
                  </div>
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-100 font-bold">
                    {dept.facultyCount} Faculty
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeSubTab === 'timetable' && (
        <Card>
          <CardHeader>
            <CardTitle icon={Clock}>Master Campus Timetable Matrix (Fall 2026)</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 text-[11px] font-bold text-slate-500 uppercase">
                  <th className="py-3 px-4">Time Slot</th>
                  <th className="py-3 px-4">Mon & Wed</th>
                  <th className="py-3 px-4">Tue & Thu</th>
                  <th className="py-3 px-4">Friday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-xs font-medium">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-400">09:00 - 10:30 AM</td>
                  <td className="py-3.5 px-4 bg-blue-50/50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-200 font-semibold">EE-102 Circuit Theory (EH-201)</td>
                  <td className="py-3.5 px-4 bg-purple-50/50 dark:bg-purple-950/20 text-purple-900 dark:text-purple-200 font-semibold">CS-405 Artificial Intelligence (TB-405)</td>
                  <td className="py-3.5 px-4 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200 font-semibold">DS-304 Neural Nets (AI-204)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-400">10:30 - 12:00 PM</td>
                  <td className="py-3.5 px-4 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-200 font-semibold">CS-301 Algorithm Analysis (TB-401)</td>
                  <td className="py-3.5 px-4 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 font-semibold">MGT-101 Principles of Mgt (BW-101)</td>
                  <td className="py-3.5 px-4 bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 font-semibold">BIO-105 Genetics (BC-202)</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      <Modal isOpen={isAddCourseModalOpen} onClose={() => setIsAddCourseModalOpen(false)} title="Add New Course">
        <form onSubmit={(e) => {
          e.preventDefault();
          setIsAddCourseModalOpen(false);
          addToast("New course registered successfully!", "success", "Course Added");
        }} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Course Code</label>
              <input type="text" required placeholder="e.g. CS-501" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Course Title</label>
              <input type="text" required placeholder="e.g. Cloud Computing" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t">
            <Button variant="secondary" onClick={() => setIsAddCourseModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">Create Course</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
