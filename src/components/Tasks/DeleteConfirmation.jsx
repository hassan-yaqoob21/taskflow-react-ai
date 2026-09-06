import Button from '../UI/Button';
import './DeleteConfirmation.css';

export default function DeleteConfirmation({ task, onConfirm, onCancel }) {
  return (
    <div className="delete-confirm">
      <p className="delete-confirm-text">
        Are you sure you want to delete <strong>"{task.title}"</strong>?
        This action cannot be undone.
      </p>
      <div className="delete-confirm-actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}
