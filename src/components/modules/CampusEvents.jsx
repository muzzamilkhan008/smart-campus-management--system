import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Plus,
  Trash2,
  Sparkles,
  Tag
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { ConfirmDialog } from '../ui/ConfirmDialog';

export const CampusEvents = () => {
  const { events, addEvent, deleteEvent } = useData();
  const { addToast } = useToast();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Technical',
    date: '2026-10-30',
    time: '10:00 AM - 04:00 PM',
    location: 'Main Campus Auditorium',
    organizer: 'Computer Science Society',
    description: ''
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const created = addEvent(formData);
    setIsAddModalOpen(false);
    addToast(`Published campus event: ${created.title}`, 'success', 'Event Created');
  };

  const handleDeleteConfirm = () => {
    if (activeEvent) {
      deleteEvent(activeEvent.id);
      addToast(`Deleted event ${activeEvent.title}`, 'warning', 'Event Removed');
    }
  };

  const filteredEvents = events.filter(e => selectedCategory === 'All' || e.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            <span>Campus Events & Hackathons</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Discover university symposiums, career fairs, sports tournaments, and innovation expos.
          </p>
        </div>
        <Button variant="gradient" icon={Plus} onClick={() => setIsAddModalOpen(true)}>
          Create Event
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
        {['All', 'Technical', 'Career', 'Sports', 'Academic'].map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map(evt => (
          <Card key={evt.id} hover>
            <div className="h-44 w-full relative overflow-hidden rounded-t-2xl">
              <img src={evt.banner} alt={evt.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <Badge variant="purple" size="md">{evt.category}</Badge>
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => { setActiveEvent(evt); setIsDeleteModalOpen(true); }}
                  className="p-1.5 bg-slate-900/70 text-rose-400 hover:bg-rose-600 hover:text-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <CardContent className="space-y-3 text-xs">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{evt.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">{evt.description}</p>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200/60 dark:border-slate-700 space-y-1.5">
                <p className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-purple-500" /> {evt.date} • {evt.time}
                </p>
                <p className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" /> {evt.location}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-slate-400 font-semibold">{evt.organizer}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{evt.attendees} Registered</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create New Event">
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold mb-1">Event Title *</label>
            <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <option value="Technical">Technical</option>
                <option value="Career">Career</option>
                <option value="Sports">Sports</option>
                <option value="Academic">Academic</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Event Date</label>
              <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700" />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700" />
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gradient">Publish Event</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Remove Event"
        message={`Are you sure you want to delete event: ${activeEvent?.title}?`}
      />
    </div>
  );
};
