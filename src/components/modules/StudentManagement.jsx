import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  GraduationCap,
  Award,
  BookOpen,
  Mail,
  Phone,
  Calendar,
  CreditCard
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { EmptyState } from '../ui/EmptyState';

export const StudentManagement = () => {
  const { students, addStudent, updateStudent, deleteStudent, departments } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [activeStudent, setActiveStudent] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Male',
    dob: '2003-01-01',
    department: 'Computer Science',
    program: 'B.Tech Computer Science',
    semester: '6th',
    section: 'A',
    cgpa: 3.50,
    parentName: '',
    parentPhone: '',
    parentEmail: ''
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      gender: 'Male',
      dob: '2003-01-01',
      department: 'Computer Science',
      program: 'B.Tech Computer Science',
      semester: '6th',
      section: 'A',
      cgpa: 3.50,
      parentName: '',
      parentPhone: '',
      parentEmail: ''
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setActiveStudent(student);
    setFormData({ ...student });
    setIsEditModalOpen(true);
  };

  const handleOpenProfile = (student) => {
    setActiveStudent(student);
    setIsProfileModalOpen(true);
  };

  const handleOpenDelete = (student) => {
    setActiveStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const created = addStudent(formData);
    setIsAddModalOpen(false);
    addToast(`Added student ${created.name} (${created.id})`, 'success', 'Student Enrolled');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateStudent(activeStudent.id, formData);
    setIsEditModalOpen(false);
    addToast(`Updated student profile for ${formData.name}`, 'success', 'Profile Updated');
  };

  const handleDeleteConfirm = () => {
    if (activeStudent) {
      deleteStudent(activeStudent.id);
      addToast(`Deleted student record ${activeStudent.name}`, 'warning', 'Student Removed');
    }
  };

  // Filter & Search Logic
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || s.department === selectedDept;
    const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;
    return matchesSearch && matchesDept && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'cgpa') return b.cgpa - a.cgpa;
    if (sortBy === 'attendance') return b.attendance - a.attendance;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <span>Student Management Directory</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage student records, enrollment status, parent details, and academic profiles.
          </p>
        </div>
        <Button variant="gradient" icon={Plus} onClick={handleOpenAdd}>
          Add New Student
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Dept Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedDept}
                onChange={(e) => { setSelectedDept(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Departments</option>
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>

            {/* Status Filter */}
            <div className="sm:col-span-2">
              <select
                value={selectedStatus}
                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="On Probation">On Probation</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="sm:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="cgpa">Sort by CGPA</option>
                <option value="attendance">Sort by Attendance</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student List Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {paginatedStudents.length === 0 ? (
            <EmptyState title="No students match criteria" description="Try clearing filters or search terms." />
          ) : (
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-800/80 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200/80 dark:border-slate-700/80">
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Student ID</th>
                  <th className="py-3.5 px-4">Department & Program</th>
                  <th className="py-3.5 px-4">Attendance</th>
                  <th className="py-3.5 px-4">CGPA</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-xs font-medium">
                {paginatedStudents.map((stu) => (
                  <tr key={stu.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={stu.avatar} alt={stu.name} className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-500/20" />
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{stu.name}</div>
                          <div className="text-[10px] text-slate-400">{stu.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">{stu.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{stu.department}</div>
                      <div className="text-[10px] text-slate-400">{stu.program} • Sem {stu.semester}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${stu.attendance >= 85 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                        {stu.attendance}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-blue-600 dark:text-blue-400">{stu.cgpa.toFixed(2)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={stu.status === 'Active' ? 'emerald' : 'amber'} size="sm">
                        {stu.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenProfile(stu)}
                          className="p-1.5 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(stu)}
                          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          title="Edit Student"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(stu)}
                          className="p-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Pagination Bar */}
      {filteredStudents.length > 0 && (
        <div className="flex items-center justify-between px-2 text-xs">
          <p className="text-slate-500">
            Showing <span className="font-bold">{((currentPage - 1) * itemsPerPage) + 1}</span> to <span className="font-bold">{Math.min(currentPage * itemsPerPage, filteredStudents.length)}</span> of <span className="font-bold">{filteredStudents.length}</span> students
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </Button>
            <span className="font-bold text-slate-700 dark:text-slate-300">Page {currentPage} of {totalPages}</span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            >
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Enroll New Student">
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Department *</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              >
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Program / Degree</label>
              <input
                type="text"
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Semester</label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              >
                {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">CGPA</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={formData.cgpa}
                onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">Save Student</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Student Profile">
        <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              >
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">Update Changes</Button>
          </div>
        </form>
      </Modal>

      {/* Student 360 Profile Drawer/Modal */}
      <Modal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} title="Student 360° Academic Profile">
        {activeStudent && (
          <div className="space-y-6 text-xs">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
              <img src={activeStudent.avatar} alt={activeStudent.name} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-800" />
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{activeStudent.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-mono font-bold">{activeStudent.id}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="blue">{activeStudent.department}</Badge>
                  <Badge variant="emerald">{activeStudent.status}</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-bold uppercase text-[9px]">Attendance</span>
                <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">{activeStudent.attendance}%</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-bold uppercase text-[9px]">Cumulative CGPA</span>
                <p className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">{activeStudent.cgpa.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-bold uppercase text-[9px]">Fees Status</span>
                <p className="text-base font-extrabold text-purple-600 dark:text-purple-400 mt-0.5">{activeStudent.feesStatus}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 font-bold uppercase text-[9px]">Semester</span>
                <p className="text-base font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{activeStudent.semester}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-500" /> Parent / Guardian Information
              </h4>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
                <p><span className="font-semibold">Parent Name:</span> {activeStudent.parentName || "Robert Morgan"}</p>
                <p><span className="font-semibold">Parent Phone:</span> {activeStudent.parentPhone || "+1 (555) 987-6543"}</p>
                <p><span className="font-semibold">Parent Email:</span> {activeStudent.parentEmail || "robert.morgan@gmail.com"}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Student Record"
        message={`Are you sure you want to remove ${activeStudent?.name} (${activeStudent?.id}) from the database?`}
      />
    </div>
  );
};
