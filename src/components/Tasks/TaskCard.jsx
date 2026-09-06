import { format, isPast, isToday } from '../../utils/dateUtils';
import {
  Check,
  Pencil,
  Trash2,
  Calendar,
  Tag,
} from 'lucide-react';
import './TaskCard.css';

const priorityColors = {
  High: 'priority-high',
  Medium: 'priority-medium',
  Low: 'priority-low',
};

const statusColors = {
  'In Progress': 'status-progress',
  Pending: 'status-pending',
  Completed: 'status-completed',
};

export default function TaskCard({
  task,
  onComplete,
  onEdit,
  onDelete,
}) {
  const dueDateObj = new Date(task.dueDate + 'T00:00:00');
  const isOverdue =
    task.status !== 'Completed' && isPast(dueDateObj) && !isToday(dueDateObj);
  const isDueToday = isToday(dueDateObj);

  return (
    <article className={`task-card ${isOverdue ? 'task-card-overdue' : ''}`}>
      <div className="task-card-header">
        <div className="task-card-badges">
          <span className={`task-badge ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          <span className={`task-badge ${statusColors[task.status]}`}>
            {task.status}
          </span>
        </div>
        <div className="task-card-actions">
          {task.status !== 'Completed' && (
            <button
              className="task-action-btn task-action-complete"
              onClick={() => onComplete(task.id)}
              aria-label={`Mark "${task.title}" as completed`}
              title="Mark complete"
            >
              <Check size={16} />
            </button>
          )}
          <button
            className="task-action-btn task-action-edit"
            onClick={() => onEdit(task)}
            aria-label={`Edit "${task.title}"`}
            title="Edit task"
          >
            <Pencil size={16} />
          </button>
          <button
            className="task-action-btn task-action-delete"
            onClick={() => onDelete(task)}
            aria-label={`Delete "${task.title}"`}
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3
        className={`task-card-title ${
          task.status === 'Completed' ? 'task-card-title-done' : ''
        }`}
      >
        {task.title}
      </h3>

      {task.description && (
        <p className="task-card-desc">{task.description}</p>
      )}

      <div className="task-card-meta">
        <span className="task-card-meta-item">
          <Calendar size={14} />
          <span className={isOverdue ? 'text-overdue' : isDueToday ? 'text-today' : ''}>
            {isOverdue
              ? 'Overdue'
              : isDueToday
              ? 'Due today'
              : format(dueDateObj)}
          </span>
        </span>
        <span className="task-card-meta-item">
          <Tag size={14} />
          {task.category}
        </span>
      </div>
    </article>
  );
}
