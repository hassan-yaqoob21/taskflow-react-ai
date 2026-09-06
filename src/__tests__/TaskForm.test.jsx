import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskForm from '../components/Tasks/TaskForm';

describe('TaskForm', () => {
  it('shows validation errors for empty title', async () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} onCancel={() => {}} />);

    fireEvent.click(screen.getByText('Create Task'));

    expect(await screen.findByText('Task title is required.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows validation error for short title', async () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} onCancel={() => {}} />);

    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: 'ab' },
    });
    fireEvent.click(screen.getByText('Create Task'));

    expect(
      await screen.findByText('Task title must be at least 3 characters.')
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows validation error for missing due date', async () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} onCancel={() => {}} />);

    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: 'My Task' },
    });
    fireEvent.click(screen.getByText('Create Task'));

    expect(await screen.findByText('Due date is required.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with valid data', async () => {
    const onSubmit = vi.fn();
    render(<TaskForm onSubmit={onSubmit} onCancel={() => {}} />);

    fireEvent.change(screen.getByLabelText(/task title/i), {
      target: { value: 'My New Task' },
    });
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: '2026-09-15' },
    });
    fireEvent.click(screen.getByText('Create Task'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'My New Task',
        dueDate: '2026-09-15',
      })
    );
  });

  it('pre-populates form when editing a task', () => {
    const task = {
      id: '1',
      title: 'Existing Task',
      description: 'Some description',
      priority: 'High',
      status: 'In Progress',
      category: 'Design',
      dueDate: '2026-09-01',
    };

    render(<TaskForm task={task} onSubmit={() => {}} onCancel={() => {}} />);

    expect(screen.getByLabelText(/task title/i)).toHaveValue('Existing Task');
    expect(screen.getByLabelText(/due date/i)).toHaveValue('2026-09-01');
    expect(screen.getByText('Update Task')).toBeInTheDocument();
  });
});
