import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSelector } from 'react-redux';
import Event from '../Event';

// Mock the auth service
vi.mock('../../services/authService', () => ({
  getLoggedIn: vi.fn(),
}));

// Mock the getLoggedIn function
import { getLoggedIn } from '../../services/authService';

describe('Event Component', () => {
  it('should render Event heading when user is logged in', () => {
    vi.mocked(getLoggedIn).mockReturnValue(true);
    
    render(<Event />);
    
    expect(screen.getByText('Event')).toBeInTheDocument();
  });

  it('should show not logged in message when user is not logged in', () => {
    vi.mocked(getLoggedIn).mockReturnValue(false);
    
    render(<Event />);
    
    // Should show the "You're Not Logged In" heading from NotLoggedIn component
    expect(screen.getByText("You're Not Logged In")).toBeInTheDocument();
    expect(screen.getByText(/Please log in to access our Event Tab/)).toBeInTheDocument();
  });

  it('should center the content properly when logged in', () => {
    vi.mocked(getLoggedIn).mockReturnValue(true);
    
    render(<Event />);
    
    const container = screen.getByText('Event').closest('div');
    expect(container).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'h-screen');
  });

  it('should have proper heading styling when logged in', () => {
    vi.mocked(getLoggedIn).mockReturnValue(true);
    
    render(<Event />);
    
    const heading = screen.getByText('Event');
    expect(heading).toHaveClass('text-4xl', 'font-bold', 'mb-4');
  });
});
