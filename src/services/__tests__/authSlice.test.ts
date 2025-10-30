import authReducer, { loginUser, registerUser, getUser, updateUser } from '../slices/authSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('auth reducer', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('loginUser', () => {
    it('should handle loginUser.pending - loading becomes true', () => {
      const action = { type: loginUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle loginUser.fulfilled - user data is written and loading becomes false', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    it('should handle loginUser.rejected - error is written and loading becomes false', () => {
      const errorMessage = 'Login failed';
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toBeNull();
    });
  });

  describe('registerUser', () => {
    it('should handle registerUser.pending - loading becomes true', () => {
      const action = { type: registerUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle registerUser.fulfilled - user data is written and loading becomes false', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    it('should handle registerUser.rejected - error is written and loading becomes false', () => {
      const errorMessage = 'Registration failed';
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toBeNull();
    });
  });

  describe('getUser', () => {
    it('should handle getUser.pending - loading becomes true', () => {
      const action = { type: getUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(true);
    });

    it('should handle getUser.fulfilled - user data is written, loading becomes false, isAuthChecked becomes true', () => {
      const action = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle getUser.rejected - loading becomes false and isAuthChecked becomes true', () => {
      const action = { type: getUser.rejected.type };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toBeNull();
    });
  });

  describe('updateUser', () => {
    it('should handle updateUser.pending - loading becomes true', () => {
      const action = { type: updateUser.pending.type };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle updateUser.fulfilled - user data is updated and loading becomes false', () => {
      const initialStateWithUser = {
        ...initialState,
        user: mockUser
      };

      const updatedUser = { ...mockUser, name: 'Updated User' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const state = authReducer(initialStateWithUser, action);

      expect(state.loading).toBe(false);
      expect(state.user).toEqual(updatedUser);
      expect(state.error).toBeNull();
    });

    it('should handle updateUser.rejected - error is written and loading becomes false', () => {
      const errorMessage = 'Update failed';
      const action = {
        type: updateUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = authReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
