import { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { initialTasks } from './data/initialTasks';
import { toISODate } from './utils/dateUtils';
import Layout from './components/Layout/Layout';
import StatCard from './components/Dashboard/StatCard';
import TaskSummary from './components/Dashboard/TaskSummary';
import TaskFilters from './components/Tasks/TaskFilters';
import TaskSearch from './components/Tasks/TaskSearch';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';
import DeleteConfirmation from './components/Tasks/DeleteConfirmation';
import Modal from './components/UI/Modal';
import Toast from './components/UI/Toast';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('taskflow-tasks', initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, key: Date.now() });
  }, []);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (activeView === 'completed') {
      result = result.filter((t) => t.status === 'Completed');
    } else if (activeView === 'tasks') {
      result = [...result];
    } else if (activeView === 'dashboard') {
      result = [...result];
    }

    if (activeFilter === 'active') {
      result = result.filter((t) => t.status !== 'Completed');
    } else if (activeFilter === 'completed') {
      result = result.filter((t) => t.status === 'Completed');
    } else if (activeFilter === 'high') {
      result = result.filter((t) => t.priority === 'High');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [tasks, activeFilter, activeView, searchQuery]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const pending = tasks.filter((t) => t.status !== 'Completed').length;
    const high = tasks.filter((t) => t.priority === 'High' && t.status !== 'Completed').length;
    return { total, completed, pending, high };
  }, [tasks]);

  const openAddForm = () => {
    setEditingTask(null);
    setFormModalOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setFormModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...formData } : t))
      );
      showToast('Task updated successfully');
    } else {
      const newTask = {
        ...formData,
        id: crypto.randomUUID(),
        createdAt: toISODate(new Date()),
      };
      setTasks((prev) => [newTask, ...prev]);
      showToast('Task created successfully');
    }
    setFormModalOpen(false);
    setEditingTask(null);
  };

  const handleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: 'Completed' } : t
      )
    );
    showToast('Task marked as completed');
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    setDeleteModalOpen(false);
    setTaskToDelete(null);
    showToast('Task deleted successfully');
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const getEmptyReason = () => {
    if (tasks.length === 0) return 'noTasks';
    if (filteredTasks.length === 0 && (searchQuery || activeFilter !== 'all'))
      return 'noResults';
    if (activeView === 'completed' && filteredTasks.length === 0)
      return 'noCompleted';
    if (filteredTasks.length === 0) return 'noTasks';
    return 'noTasks';
  };

  return (
    <Layout
      activeView={activeView}
      onViewChange={setActiveView}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onAddTask={openAddForm}
      sidebarOpen={sidebarOpen}
      onSidebarToggle={() => setSidebarOpen((p) => !p)}
      onSidebarClose={() => setSidebarOpen(false)}
    >
      {(activeView === 'dashboard' || activeView === 'tasks' || activeView === 'completed') && (
        <>
          {activeView === 'dashboard' && (
            <>
              <section className="dashboard-welcome">
                <h2 className="welcome-heading">Welcome back!</h2>
                <p className="welcome-sub">
                  Here's an overview of your tasks and progress.
                </p>
              </section>

              <section className="dashboard-stats">
                <StatCard icon={ListTodo} label="Total Tasks" value={stats.total} color="indigo" />
                <StatCard icon={CheckCircle2} label="Completed" value={stats.completed} color="green" />
                <StatCard icon={Clock} label="Pending" value={stats.pending} color="amber" />
                <StatCard icon={AlertTriangle} label="High Priority" value={stats.high} color="red" />
              </section>

              <section className="dashboard-summary">
                <TaskSummary tasks={tasks} />
              </section>
            </>
          )}

          <section className="tasks-controls">
            <TaskSearch value={searchQuery} onChange={setSearchQuery} />
            <TaskFilters activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          </section>

          <section className="tasks-section">
            <TaskList
              tasks={filteredTasks}
              onComplete={handleComplete}
              onEdit={openEditForm}
              onDelete={handleDeleteClick}
              emptyReason={getEmptyReason()}
            />
          </section>
        </>
      )}

      {activeView === 'settings' && (
        <div className="settings-view">
          <div className="settings-card">
            <h2 className="settings-title">Settings</h2>
            <p className="settings-text">
              TaskFlow stores all data in your browser's localStorage.
              No backend is required. Your tasks persist across sessions.
            </p>
            <p className="settings-text">
              To clear all tasks, use your browser's developer tools to remove
              the <code>taskflow-tasks</code> key from localStorage.
            </p>
          </div>
        </div>
      )}

      <Modal
        isOpen={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setEditingTask(null);
        }}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        <TaskForm
          key={editingTask ? editingTask.id : 'new'}
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormModalOpen(false);
            setEditingTask(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        title="Delete Task"
      >
        {taskToDelete && (
          <DeleteConfirmation
            task={taskToDelete}
            onConfirm={handleDeleteConfirm}
            onCancel={() => {
              setDeleteModalOpen(false);
              setTaskToDelete(null);
            }}
          />
        )}
      </Modal>

      {toast && (
        <Toast
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </Layout>
  );
}
