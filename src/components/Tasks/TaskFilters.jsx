import './TaskFilters.css';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'high', label: 'High Priority' },
];

export default function TaskFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="task-filters" role="tablist" aria-label="Filter tasks">
      {filters.map((f) => (
        <button
          key={f.id}
          className={`task-filter-btn ${
            activeFilter === f.id ? 'task-filter-btn-active' : ''
          }`}
          onClick={() => onFilterChange(f.id)}
          role="tab"
          aria-selected={activeFilter === f.id}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
