import React from 'react';
import { NotificationItem, ActiveTab } from '../types';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Check,
} from 'lucide-react';

interface NotificationsCenterProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const NotificationsCenter: React.FC<NotificationsCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigateTab,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'gap_alert':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'course_recommendation':
        return <GraduationCap className="w-4 h-4 text-purple-600" />;
      case 'assessment':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'approval':
        return <ShieldCheck className="w-4 h-4 text-indigo-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div id="notifications-center-container" className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Real-Time Alerts & Notification Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Notifications & Deadlines
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Live alerts for identified competency gaps, course recommendations, and mandatory benchmarks
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            id={`notif-card-${n.id}`}
            className={`p-5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              !n.read
                ? 'bg-white border-indigo-200 ring-1 ring-indigo-100 shadow-xs'
                : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                  !n.read ? 'bg-indigo-50' : 'bg-slate-100'
                }`}
              >
                {getIcon(n.type)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {n.title}
                  </h4>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {n.message}
                </p>
                <span className="text-[10px] text-slate-400 block pt-0.5">
                  {n.timestamp}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              {n.actionLabel && n.actionTab && (
                <button
                  type="button"
                  onClick={() => {
                    onMarkAsRead(n.id);
                    onNavigateTab(n.actionTab!);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>{n.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
              {!n.read && (
                <button
                  type="button"
                  onClick={() => onMarkAsRead(n.id)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
