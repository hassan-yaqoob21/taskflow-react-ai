import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskSearch from '../components/Tasks/TaskSearch';

describe('TaskSearch', () => {
  it('renders search input', () => {
    render(<TaskSearch value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText(/search by title/i)).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const onChange = vi.fn();
    render(<TaskSearch value="" onChange={onChange} />);

    fireEvent.change(screen.getByPlaceholderText(/search by title/i), {
      target: { value: 'hello' },
    });
    expect(onChange).toHaveBeenCalledWith('hello');
  });

  it('shows clear button when value is present', () => {
    render(<TaskSearch value="test" onChange={() => {}} />);
    expect(screen.getByLabelText(/clear search/i)).toBeInTheDocument();
  });

  it('calls onChange with empty string when clear is clicked', () => {
    const onChange = vi.fn();
    render(<TaskSearch value="test" onChange={onChange} />);

    fireEvent.click(screen.getByLabelText(/clear search/i));
    expect(onChange).toHaveBeenCalledWith('');
  });
});
