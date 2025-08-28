import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSelector } from 'react-redux';
import Home from '../Home';

// Mock the useSelector hook
vi.mocked(useSelector).mockReturnValue(false); // Not logged in by default

describe('Home Component', () => {
  it('should render Home component with main heading', () => {
    render(<Home />);
    
    // Check for the main heading specifically
    const mainHeading = screen.getByRole('heading', { name: /^Alumni Social$/, level: 1 });
    expect(mainHeading).toBeInTheDocument();
  });

  it('should render welcome section', () => {
    render(<Home />);
    
    // Check for the welcome heading
    const welcomeHeading = screen.getByRole('heading', { name: /Welcome to Alumni Social/, level: 2 });
    expect(welcomeHeading).toBeInTheDocument();
    
    // Check for descriptive paragraph
    expect(screen.getByText(/Connect with your fellow alumni/)).toBeInTheDocument();
  });

  it('should display graduation illustration', () => {
    render(<Home />);
    
    // Check if the illustration is present
    const illustration = screen.getByAltText('Graduation Illustration');
    expect(illustration).toBeInTheDocument();
    expect(illustration).toHaveClass('w-3/4');
  });

  it('should have proper layout structure', () => {
    render(<Home />);
    
    // Check for main container structure
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-gray-400', 'text-white', 'py-8');
    
    const main = screen.getByRole('main');
    expect(main).toHaveClass('container', 'mx-auto', 'px-4', 'py-8');
  });
});
