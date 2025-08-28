import { describe, it, expect } from 'vitest';
import authReducer, { login, logout } from '../authSlice';

describe('authSlice', () => {
  const initialState = {
    loggedIn: false,
    currentUser: null,
    role: "",
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle login action', () => {
    const payload = {
      user: { id: '1', email: 'test@example.com' },
      role: 'alumni'
    };

    const action = login(payload);
    const newState = authReducer(initialState, action);

    expect(newState.loggedIn).toBe(true);
    expect(newState.currentUser).toEqual(payload);
    expect(newState.role).toBe('alumni');
  });

  it('should handle logout action', () => {
    const loggedInState = {
      loggedIn: true,
      currentUser: { user: { id: '1', email: 'test@example.com' }, role: 'alumni' },
      role: 'alumni',
    };

    const action = logout();
    const newState = authReducer(loggedInState, action);

    expect(newState.loggedIn).toBe(false);
    expect(newState.currentUser).toBeNull();
    expect(newState.role).toBeNull();
  });
});
