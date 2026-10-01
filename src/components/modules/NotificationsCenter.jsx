import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  Bell,
  CheckCircle2,
  Trash2,
  Filter,
  CheckCheck
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const NotificationsCenter = () => {
  const { notifications, markNotificationRead, deleteNotification } = useData();
  const { addToast } = useToast();

  const [filterType, setFilterType] = useState('All');

  const filteredNotifications = notifications.filter(n => filterType === 'All' || n.type === filterType);

  const handleMarkAllRead = () => {
    notifications.forEach(n => markNotificationRead(n.id));
    addToast('All notifications marked as read', 'success', 'Notification Status');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            <span>Campus Notification Center</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time alerts for exam dates, attendance warnings, fee receipts, and announcements.
          </p>
        </div>
        <Button variant="outline" size="sm" icon={CheckCheck} onClick={handleMarkAllRead}>
          Mark All as Read
        </Button>
      </div>

      {/* Type Filter */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
        {['All', 'Academic', 'Attendance', 'Fees', 'System'].map(t => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === t
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-700/50">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">No notifications in this category.</div>
          ) : (
            filteredNotifications.map(n => (
              <div key={n.id} className={`p-4 flex items-start justify-between gap-4 transition-colors ${!n.read ? 'bg-blue-50/30 dark:bg-blue-950/20' : ''}`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={n.priority === 'High' ? 'rose' : n.priority === 'Medium' ? 'amber' : 'blue'} size="sm">
                      {n.type}
                    </Badge>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{n.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-slate-400 font-mono block mt-1">{n.time}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!n.read && (
                    <button
                      onClick={() => markNotificationRead(n.id)}
                      className="text-xs text-blue-600 hover:underline font-bold"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(n.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};
