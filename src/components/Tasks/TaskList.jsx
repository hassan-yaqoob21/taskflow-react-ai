import TaskCard from './TaskCard';
import EmptyState from '../UI/EmptyState';
import { ClipboardList, SearchX, CheckCircle2 } from 'lucide-react';
import './TaskList.css';

export default function TaskList({ tasks, onComplete, onEdit, onDelete, emptyReason }) {
  if (tasks.length === 0) {
    const emptyConfig = {
      noTasks: {
        icon: ClipboardList,
        title: "You're all caught up",
        message: 'Create a task to get started.',
      },
      noResults: {
        icon: SearchX,
        title: 'No tasks match your search',
        message: 'Try a different search term or adjust your filters.',
      },
      noCompleted: {
        icon: CheckCircle2,
        title: 'No completed tasks yet',
        message: 'Complete a task and it will show up here.',
      },
    };

    const config = emptyConfig[emptyReason] || emptyConfig.noTasks;
    return <EmptyState {...config} />;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
