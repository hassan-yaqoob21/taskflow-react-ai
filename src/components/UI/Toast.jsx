import { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import './Toast.css';

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const typeClasses = {
  success: 'toast-success',
  error: 'toast-error',
  info: 'toast-info',
};

export default function Toast({ message, type = 'success', onDismiss }) {
  const [visible, setVisible] = useState(true);
  const Icon = icons[type] || icons.info;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className={`toast ${typeClasses[type]} ${visible ? 'toast-visible' : ''}`}
      role="status"
      aria-live="polite"
    >
      <Icon size={18} className="toast-icon" />
      <span className="toast-message">{message}</span>
      <button
        className="toast-dismiss"
        onClick={() => {
          setVisible(false);
          setTimeout(onDismiss, 300);
        }}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
