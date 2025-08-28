import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';

// Custom render function that includes providers
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        auth: authSlice,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Mock user data for tests
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'alumni',
  isApproved: true,
};

export const mockAdmin = {
  id: '2',
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  isApproved: true,
};

// Mock API responses
export const mockLoginResponse = {
  status: 'success',
  data: {
    user: mockUser,
    token: 'mock-jwt-token',
  },
};

export const mockErrorResponse = {
  status: 'fail',
  message: 'Test error message',
};
