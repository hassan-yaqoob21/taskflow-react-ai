import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskCard from '../components/Tasks/TaskCard';

const baseTask = {
  id: '1',
  title: 'Test Task',
  description: 'A test description',
  priority: 'Medium',
  status: 'Pending',
  category: 'Development',
  dueDate: '2026-12-31',
  createdAt: '2026-08-25',
};

describe('TaskCard', () => {
  it('renders task title and description', () => {
    render(
      <TaskCard task={baseTask} onComplete={() => {}} onEdit={() => {}} onDelete={() => {}} />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('A test description')).toBeInTheDocument();
  });

  it('calls onComplete when complete button is clicked', () => {
    const onComplete = vi.fn();
    render(
      <TaskCard task={baseTask} onComplete={onComplete} onEdit={() => {}} onDelete={() => {}} />
    );

    fireEvent.click(screen.getByLabelText(/mark "Test Task" as completed/i));
    expect(onComplete).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(
      <TaskCard task={baseTask} onComplete={() => {}} onEdit={() => {}} onDelete={onDelete} />
    );

    fireEvent.click(screen.getByLabelText(/delete "Test Task"/i));
    expect(onDelete).toHaveBeenCalledWith(baseTask);
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    render(
      <TaskCard task={baseTask} onComplete={() => {}} onEdit={onEdit} onDelete={() => {}} />
    );

    fireEvent.click(screen.getByLabelText(/edit "Test Task"/i));
    expect(onEdit).toHaveBeenCalledWith(baseTask);
  });

  it('hides complete button for completed tasks', () => {
    const completedTask = { ...baseTask, status: 'Completed' };
    render(
      <TaskCard task={completedTask} onComplete={() => {}} onEdit={() => {}} onDelete={() => {}} />
    );

    expect(screen.queryByLabelText(/mark "Test Task" as completed/i)).not.toBeInTheDocument();
  });
});
