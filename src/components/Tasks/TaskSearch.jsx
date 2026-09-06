import { Search, X } from 'lucide-react';
import './TaskSearch.css';

export default function TaskSearch({ value, onChange }) {
  return (
    <div className="task-search">
      <Search size={18} className="task-search-icon" />
      <input
        type="search"
        className="task-search-input"
        placeholder="Search by title, description, or category..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search tasks"
      />
      {value && (
        <button
          className="task-search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
