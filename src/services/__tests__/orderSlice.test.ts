import orderReducer, { createOrder, clearOrder } from '../slices/orderSlice';
import { TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['ing1', 'ing2']
};

describe('order reducer', () => {
  const initialState = {
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  it('should return initial state', () => {
    expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('createOrder', () => {
    it('should handle createOrder.pending - isLoading becomes true', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle createOrder.fulfilled - data is written and isLoading becomes false', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: { order: mockOrder }
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });

    it('should handle createOrder.rejected - error is written and isLoading becomes false', () => {
      const errorMessage = 'Failed to create order';
      const action = {
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.orderModalData).toBeNull();
    });
  });

  describe('clearOrder', () => {
    it('should clear order data and error', () => {
      const stateWithData = {
        orderRequest: false,
        orderModalData: mockOrder,
        error: 'Some error'
      };

      const action = clearOrder();
      const state = orderReducer(stateWithData, action);

      expect(state.orderModalData).toBeNull();
      expect(state.error).toBeNull();
    });
  });
});
