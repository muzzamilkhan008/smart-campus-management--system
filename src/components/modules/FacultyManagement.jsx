import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  GraduationCap,
  Search,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Mail,
  Phone,
  Building2,
  Calendar,
  Eye
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { EmptyState } from '../ui/EmptyState';

export const FacultyManagement = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher, departments } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTeacher, setActiveTeacher] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    office: 'Tech Block Room 101',
    qualification: 'Ph.D. in Computer Science'
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: 'Computer Science',
      designation: 'Assistant Professor',
      office: 'Tech Block Room 101',
      qualification: 'Ph.D. in Computer Science'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (teacher) => {
    setActiveTeacher(teacher);
    setFormData({ ...teacher });
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (teacher) => {
    setActiveTeacher(teacher);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const created = addTeacher(formData);
    setIsAddModalOpen(false);
    addToast(`Added faculty member ${created.name}`, 'success', 'Faculty Enrolled');
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTeacher(activeTeacher.id, formData);
    setIsEditModalOpen(false);
    addToast(`Updated faculty details for ${formData.name}`, 'success', 'Profile Updated');
  };

  const handleDeleteConfirm = () => {
    if (activeTeacher) {
      deleteTeacher(activeTeacher.id);
      addToast(`Deleted faculty record ${activeTeacher.name}`, 'warning', 'Faculty Removed');
    }
  };

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'All' || t.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Teacher & Faculty Management</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage academic professors, associate faculty, course assignments, and office hours.
          </p>
        </div>
        <Button variant="gradient" icon={Plus} onClick={handleOpenAdd}>
          Add Faculty Member
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search faculty by name, ID, or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-4">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Departments</option>
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Faculty Cards Grid */}
      {filteredTeachers.length === 0 ? (
        <EmptyState title="No faculty found" description="Try broadening your department search filter." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map(teacher => (
            <Card key={teacher.id} hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img src={teacher.avatar} alt={teacher.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/30" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{teacher.name}</h3>
                    <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">{teacher.designation}</p>
                  </div>
                </div>
                <Badge variant="purple" size="sm">{teacher.id}</Badge>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200/60 dark:border-slate-700 space-y-1">
                  <p className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-blue-500" /> <span className="font-semibold">{teacher.department}</span>
                  </p>
                  <p className="flex items-center gap-2 text-slate-500">
                    <Mail className="w-3.5 h-3.5" /> {teacher.email}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Assigned Courses:</span>
                  <div className="flex flex-wrap gap-1">
                    {teacher.courses && teacher.courses.map((c, i) => (
                      <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-end gap-2">
                  <Button variant="outline" size="sm" icon={Edit} onClick={() => handleOpenEdit(teacher)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleOpenDelete(teacher)}>
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add Faculty Member">
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
              <label className="block font-semibold mb-1">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            <div>
              <label className="block font-semibold mb-1">Designation</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">Save Faculty</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Faculty Profile">
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
            <Button type="submit" variant="gradient">Save Changes</Button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Remove Faculty Member"
        message={`Are you sure you want to remove ${activeTeacher?.name} (${activeTeacher?.id}) from faculty records?`}
      />
    </div>
  );
};
