import profileOrdersReducer, { fetchProfileOrders } from '../slices/profileOrdersSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Profile Order 1',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 1,
    ingredients: ['ing1', 'ing2']
  }
];

describe('profileOrders reducer', () => {
  const initialState = {
    orders: [],
    loading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(profileOrdersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchProfileOrders', () => {
    it('should handle fetchProfileOrders.pending - loading becomes true', () => {
      const action = { type: fetchProfileOrders.pending.type };
      const state = profileOrdersReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchProfileOrders.fulfilled - data is written and loading becomes false', () => {
      const action = {
        type: fetchProfileOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = profileOrdersReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.error).toBeNull();
    });

    it('should handle fetchProfileOrders.rejected - error is written and loading becomes false', () => {
      const errorMessage = 'Failed to fetch profile orders';
      const action = {
        type: fetchProfileOrders.rejected.type,
        error: { message: errorMessage }
      };
      const state = profileOrdersReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orders).toEqual([]);
    });
  });
});
