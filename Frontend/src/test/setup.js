import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: () => vi.fn(),
  Provider: ({ children }) => children,
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
  Link: ({ children, to, ...props }) => 
    React.createElement('a', { href: to, ...props }, children),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
  ToastContainer: () => null,
}));

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
