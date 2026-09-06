import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatCard from '../components/Dashboard/StatCard';
import { ListTodo } from 'lucide-react';

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard icon={ListTodo} label="Total Tasks" value={12} color="indigo" />);

    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });
});
