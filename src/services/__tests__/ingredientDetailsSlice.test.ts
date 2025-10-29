import ingredientDetailsReducer, { setIngredient, clearIngredient } from '../slices/ingredientDetailsSlice';
import { TIngredient } from '@utils-types';

const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 100,
  price: 200,
  image: 'image-url',
  image_large: 'image-large-url',
  image_mobile: 'image-mobile-url'
};

describe('ingredientDetails reducer', () => {
  const initialState = {
    ingredient: null
  };

  it('should return initial state', () => {
    expect(ingredientDetailsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setIngredient', () => {
    it('should set ingredient data', () => {
      const action = setIngredient(mockIngredient);
      const state = ingredientDetailsReducer(initialState, action);

      expect(state.ingredient).toEqual(mockIngredient);
    });
  });

  describe('clearIngredient', () => {
    it('should clear ingredient data', () => {
      const stateWithIngredient = {
        ingredient: mockIngredient
      };

      const action = clearIngredient();
      const state = ingredientDetailsReducer(stateWithIngredient, action);

      expect(state.ingredient).toBeNull();
    });
  });
});
