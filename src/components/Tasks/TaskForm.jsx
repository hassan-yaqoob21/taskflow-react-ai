import { useState } from 'react';
import Button from '../UI/Button';
import './TaskForm.css';

const categories = ['Development', 'Design', 'Marketing', 'Personal', 'Research'];
const priorities = ['Low', 'Medium', 'High'];
const statuses = ['Pending', 'In Progress', 'Completed'];

const emptyForm = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Pending',
  category: 'Development',
  dueDate: '',
};

export default function TaskForm({ task, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    task
      ? {
          title: task.title || '',
          description: task.description || '',
          priority: task.priority || 'Medium',
          status: task.status || 'Pending',
          category: task.category || 'Development',
          dueDate: task.dueDate || '',
        }
      : emptyForm
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) {
      newErrors.title = 'Task title is required.';
    } else if (form.title.trim().length < 3) {
      newErrors.title = 'Task title must be at least 3 characters.';
    }
    if (!form.dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="task-title" className="form-label">
          Task Title <span className="form-required">*</span>
        </label>
        <input
          id="task-title"
          type="text"
          className={`form-input ${errors.title ? 'form-input-error' : ''}`}
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter task title"
          autoFocus
        />
        {errors.title && <p className="form-error" role="alert">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="task-desc" className="form-label">Description</label>
        <textarea
          id="task-desc"
          className="form-input form-textarea"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter task description"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-priority" className="form-label">Priority</label>
          <select
            id="task-priority"
            className="form-input form-select"
            value={form.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
          >
            {priorities.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-status" className="form-label">Status</label>
          <select
            id="task-status"
            className="form-input form-select"
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-category" className="form-label">Category</label>
          <select
            id="task-category"
            className="form-input form-select"
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="task-due" className="form-label">
            Due Date <span className="form-required">*</span>
          </label>
          <input
            id="task-due"
            type="date"
            className={`form-input ${errors.dueDate ? 'form-input-error' : ''}`}
            value={form.dueDate}
            onChange={(e) => handleChange('dueDate', e.target.value)}
          />
          {errors.dueDate && <p className="form-error" role="alert">{errors.dueDate}</p>}
        </div>
      </div>

      <div className="form-actions">
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}
