import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { HelpCircle, Plus, Search, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';

export const SupportSystem = () => {
  const { tickets, addTicket, updateTicketStatus } = useData();
  const { addToast } = useToast();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Facility',
    priority: 'Medium',
    description: '',
    studentName: 'Alex Morgan',
    studentId: 'STU-1001'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const created = addTicket(formData);
    setIsAddModalOpen(false);
    addToast(`Submitted support ticket #${created.id}`, 'success', 'Ticket Logged');
  };

  const handleStatusChange = (id, status) => {
    updateTicketStatus(id, status);
    addToast(`Ticket #${id} status changed to ${status}`, 'info', 'Status Updated');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <span>Campus Helpdesk & Complaint Support</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Submit facility complaints, academic grade inquiries, technical Wi-Fi issues, or campus suggestions.
          </p>
        </div>
        <Button variant="gradient" icon={Plus} onClick={() => setIsAddModalOpen(true)}>
          Submit Support Ticket
        </Button>
      </div>

      <div className="space-y-4">
        {tickets.map(tck => (
          <Card key={tck.id} hover>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={tck.status === 'Resolved' ? 'emerald' : tck.status === 'In Progress' ? 'blue' : 'amber'} size="sm">
                    {tck.status}
                  </Badge>
                  <Badge variant="purple" size="sm">{tck.category}</Badge>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Ticket #{tck.id} • {tck.createdAt}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">{tck.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{tck.description}</p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[11px]">
                <span className="text-slate-500 font-semibold">Submitted by: {tck.studentName} ({tck.studentId})</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => handleStatusChange(tck.id, 'In Progress')} className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold hover:underline">
                    Set In Progress
                  </button>
                  <button onClick={() => handleStatusChange(tck.id, 'Resolved')} className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold hover:underline">
                    Set Resolved
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Submit New Ticket">
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1">Issue Title *</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <option value="Facility">Facility Issue</option>
                <option value="Academic">Academic Issue</option>
                <option value="Technical">Technical / Wi-Fi</option>
                <option value="Suggestion">Campus Suggestion</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Priority</label>
              <select value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Detailed Description</label>
            <textarea rows={3} required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700" />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">Submit Ticket</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
