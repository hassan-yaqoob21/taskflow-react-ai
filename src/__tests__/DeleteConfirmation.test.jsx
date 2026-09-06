import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DeleteConfirmation from '../components/Tasks/DeleteConfirmation';

describe('DeleteConfirmation', () => {
  const task = { id: '1', title: 'Task to Delete' };

  it('shows task title in confirmation message', () => {
    render(
      <DeleteConfirmation task={task} onConfirm={() => {}} onCancel={() => {}} />
    );

    expect(screen.getByText(/Task to Delete/)).toBeInTheDocument();
  });

  it('calls onConfirm when delete button is clicked', () => {
    const onConfirm = vi.fn();
    render(
      <DeleteConfirmation task={task} onConfirm={onConfirm} onCancel={() => {}} />
    );

    fireEvent.click(screen.getByText('Delete'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = vi.fn();
    render(
      <DeleteConfirmation task={task} onConfirm={() => {}} onCancel={onCancel} />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
