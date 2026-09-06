import './TaskSummary.css';

export default function TaskSummary({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="task-summary">
      <div className="task-summary-header">
        <span className="task-summary-title">Task Progress</span>
        <span className="task-summary-pct">{percentage}%</span>
      </div>
      <div className="task-summary-bar">
        <div
          className="task-summary-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="task-summary-text">
        {completed} of {total} tasks completed
      </p>
    </div>
  );
}
