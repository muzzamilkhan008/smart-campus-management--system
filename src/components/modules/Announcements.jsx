import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Megaphone, Plus, Calendar, User, Tag } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

export const Announcements = () => {
  const { announcements, addAnnouncement } = useData();
  const { addToast } = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: 'Office of the Dean',
    audience: 'All Students & Faculty',
    priority: 'Normal',
    category: 'General'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const created = addAnnouncement(formData);
    setIsAddModalOpen(false);
    addToast(`Published notice: ${created.title}`, 'success', 'Announcement Posted');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Megaphone className="w-7 h-7 text-amber-600 dark:text-amber-400" />
            <span>Campus Notice Board & Announcements</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official administrative notices, library schedules, shuttle route updates, and research grants.
          </p>
        </div>
        <Button variant="gradient" icon={Plus} onClick={() => setIsAddModalOpen(true)}>
          Post Announcement
        </Button>
      </div>

      <div className="space-y-4">
        {announcements.map(item => (
          <Card key={item.id} hover>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={item.priority === 'Urgent' ? 'rose' : 'amber'} size="sm">
                    {item.priority}
                  </Badge>
                  <Badge variant="blue" size="sm">{item.category}</Badge>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.description}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[11px]">
                <span className="text-slate-500 font-medium">Author: <strong className="text-slate-700 dark:text-slate-200">{item.author}</strong></span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">Target Audience: {item.audience}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Campus Announcement">
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1">Announcement Title *</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Priority Level</label>
              <select value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Target Audience</label>
              <select value={formData.audience} onChange={e => setFormData({ ...formData, audience: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <option value="All Students & Faculty">All Students & Faculty</option>
                <option value="All Students">All Students</option>
                <option value="Faculty Only">Faculty Only</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Description / Content</label>
            <textarea rows={4} required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700" />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">Post Notice</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
