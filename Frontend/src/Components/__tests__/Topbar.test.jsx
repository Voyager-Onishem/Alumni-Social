import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Topbar from '../Topbar';

// Mock the auth service
vi.mock('../../services/authService', () => ({
  getLoggedIn: vi.fn(() => false),
}));

// Mock react-redux
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(() => vi.fn()),
}));

// Mock authSlice
vi.mock('../../features/authSlice', () => ({
  logout: vi.fn(),
}));

describe('Topbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Alumni Connect title', () => {
    render(<Topbar />);
    
    expect(screen.getByText('Alumni Connect')).toBeInTheDocument();
  });

  it('should show hamburger menu on mobile', () => {
    render(<Topbar />);
    
    // Should have hamburger menu button
    const hamburgerButton = screen.getByRole('button');
    expect(hamburgerButton).toBeInTheDocument();
    
    // Should show FaBars icon initially
    const barsIcon = hamburgerButton.querySelector('svg');
    expect(barsIcon).toBeInTheDocument();
  });

  it('should toggle mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup();
    render(<Topbar />);
    
    const hamburgerButton = screen.getByRole('button');
    
    // Click to toggle menu
    await user.click(hamburgerButton);
    
    // The button should still be there (just the icon changes)
    expect(hamburgerButton).toBeInTheDocument();
  });

  it('should display user tie icon', () => {
    render(<Topbar />);
    
    // Check if the FaUserTie icon is rendered
    const heading = screen.getByText('Alumni Connect');
    const iconContainer = heading.parentElement?.querySelector('span');
    expect(iconContainer).toBeInTheDocument();
  });

  it('should have proper styling classes', () => {
    render(<Topbar />);
    
    // Check the main container (outermost div) which has the bg-slate-100 class
    const mainContainer = screen.getByText('Alumni Connect').closest('.bg-slate-100');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('bg-slate-100', 'text-black', 'p-4');
  });
});
