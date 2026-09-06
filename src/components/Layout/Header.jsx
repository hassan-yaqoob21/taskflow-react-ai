import { Search, Plus, Menu, User } from 'lucide-react';
import './Header.css';

export default function Header({
  title,
  searchQuery,
  onSearchChange,
  onAddTask,
  onMenuToggle,
}) {
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="header-menu-btn"
          onClick={onMenuToggle}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="header-title">{title}</h1>
      </div>
      <div className="header-right">
        <div className="header-search">
          <Search size={18} className="header-search-icon" />
          <input
            type="search"
            className="header-search-input"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search tasks"
          />
        </div>
        <button className="header-add-btn" onClick={onAddTask}>
          <Plus size={18} />
          <span className="header-add-text">Add Task</span>
        </button>
        <div className="header-avatar" aria-label="User profile">
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
