import {
  LayoutDashboard,
  ListTodo,
  CheckCircle2,
  Settings,
  Zap,
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: ListTodo, label: 'Tasks', id: 'tasks' },
  { icon: CheckCircle2, label: 'Completed', id: 'completed' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export default function Sidebar({ activeView, onViewChange, isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <Zap size={24} className="sidebar-brand-icon" />
          <span className="sidebar-brand-text">TaskFlow</span>
        </div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          <ul className="sidebar-nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`sidebar-nav-item ${
                    activeView === item.id ? 'sidebar-nav-item-active' : ''
                  }`}
                  onClick={() => {
                    onViewChange(item.id);
                    onClose();
                  }}
                  aria-current={activeView === item.id ? 'page' : undefined}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
