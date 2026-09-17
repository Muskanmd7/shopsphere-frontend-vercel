import React from 'react';
import { CheckCircle, Info, AlertCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Notification() {
  const { notification } = useApp();
  if (!notification) return null;

  const styles = {
    success: { bg: 'bg-sage-500',    Icon: CheckCircle },
    error:   { bg: 'bg-blush-500',   Icon: AlertCircle },
    info:    { bg: 'bg-primary-500', Icon: Info },
    warning: { bg: 'bg-amber-500',   Icon: AlertCircle },
  };
  const { bg, Icon } = styles[notification.type] || styles.success;

  return (
    <div className="fixed bottom-6 right-6 z-[200] animate-slide-up">
      <div className={`${bg} text-white flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-card-hover max-w-xs`}>
        <Icon className="w-5 h-5 shrink-0" />
        <span className="text-sm font-medium">{notification.message}</span>
      </div>
    </div>
  );
}
