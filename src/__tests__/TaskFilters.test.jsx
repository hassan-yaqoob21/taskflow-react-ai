import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskFilters from '../components/Tasks/TaskFilters';

describe('TaskFilters', () => {
  it('renders all filter buttons', () => {
    render(<TaskFilters activeFilter="all" onFilterChange={() => {}} />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('High Priority')).toBeInTheDocument();
  });

  it('calls onFilterChange with correct filter id', () => {
    const onFilterChange = vi.fn();
    render(<TaskFilters activeFilter="all" onFilterChange={onFilterChange} />);

    fireEvent.click(screen.getByText('Active'));
    expect(onFilterChange).toHaveBeenCalledWith('active');

    fireEvent.click(screen.getByText('High Priority'));
    expect(onFilterChange).toHaveBeenCalledWith('high');
  });

  it('highlights the active filter', () => {
    render(<TaskFilters activeFilter="completed" onFilterChange={() => {}} />);

    const completedBtn = screen.getByText('Completed');
    expect(completedBtn).toHaveClass('task-filter-btn-active');
  });
});
