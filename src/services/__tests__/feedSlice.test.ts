import feedReducer, { fetchFeeds } from '../slices/feedSlice';
import { TOrder } from '@utils-types';

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Test Order 1',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 1,
    ingredients: ['ing1', 'ing2']
  },
  {
    _id: '2',
    status: 'pending',
    name: 'Test Order 2',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 2,
    ingredients: ['ing3', 'ing4']
  }
];

describe('feed reducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchFeeds', () => {
    it('should handle fetchFeeds.pending - loading becomes true', () => {
      const action = { type: fetchFeeds.pending.type };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchFeeds.fulfilled - data is written and loading becomes false', () => {
      const action = {
        type: fetchFeeds.fulfilled.type,
        payload: {
          orders: mockOrders,
          total: 100,
          totalToday: 10
        }
      };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(10);
      expect(state.error).toBeNull();
    });

    it('should handle fetchFeeds.rejected - error is written and loading becomes false', () => {
      const errorMessage = 'Failed to fetch feeds';
      const action = {
        type: fetchFeeds.rejected.type,
        error: { message: errorMessage }
      };
      const state = feedReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
    });
  });
});
