import ingredientsReducer, { fetchIngredients } from '../slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Test Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 100,
    price: 200,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  },
  {
    _id: '2',
    name: 'Test Main',
    type: 'main',
    proteins: 15,
    fat: 10,
    carbohydrates: 5,
    calories: 150,
    price: 150,
    image: 'image-url',
    image_large: 'image-large-url',
    image_mobile: 'image-mobile-url'
  }
];

describe('ingredients reducer', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('fetchIngredients', () => {
    it('should handle fetchIngredients.pending', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);

      expect(state).toEqual({
        ingredients: [],
        loading: true,
        error: null
      });
    });

    it('should handle fetchIngredients.fulfilled', () => {
      const action = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsReducer(initialState, action);

      expect(state).toEqual({
        ingredients: mockIngredients,
        loading: false,
        error: null
      });
    });

    it('should handle fetchIngredients.rejected', () => {
      const errorMessage = 'Failed to fetch ingredients';
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const state = ingredientsReducer(initialState, action);

      expect(state).toEqual({
        ingredients: [],
        loading: false,
        error: errorMessage
      });
    });

    it('should clear ingredients on rejected with specific error message', () => {
      const stateWithIngredients = {
        ingredients: mockIngredients,
        loading: false,
        error: null
      };

      const errorMessage = 'Failed to fetch ingredients';
      const action = {
        type: fetchIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const state = ingredientsReducer(stateWithIngredients, action);

      expect(state.ingredients).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
