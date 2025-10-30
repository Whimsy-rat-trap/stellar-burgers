import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../slices/constructorSlice';
import { TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: 'bun-1',
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
};

const mockMainIngredient: TIngredient = {
  _id: 'main-1',
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
};

const mockSauceIngredient: TIngredient = {
  _id: 'sauce-1',
  name: 'Test Sauce',
  type: 'sauce',
  proteins: 5,
  fat: 2,
  carbohydrates: 8,
  calories: 50,
  price: 80,
  image: 'image-url',
  image_large: 'image-large-url',
  image_mobile: 'image-mobile-url'
};

describe('burgerConstructor reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('should return initial state', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addBun', () => {
    it('should handle adding a bun', () => {
      const action = addBun(mockBun);
      const state = constructorReducer(initialState, action);

      expect(state.bun).toEqual(mockBun);
      expect(state.ingredients).toEqual([]);
    });

    it('should replace existing bun when adding new one', () => {
      const firstState = constructorReducer(initialState, addBun(mockBun));
      const newBun = { ...mockBun, _id: 'bun-2', name: 'New Bun' };
      const state = constructorReducer(firstState, addBun(newBun));

      expect(state.bun).toEqual(newBun);
      expect(state.ingredients).toEqual([]);
    });
  });

  describe('addIngredient', () => {
    it('should handle adding a main ingredient', () => {
      const action = addIngredient(mockMainIngredient);
      const state = constructorReducer(initialState, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toMatchObject({
        ...mockMainIngredient,
        id: expect.any(String) // uuid добавляется при создании
      });
      expect(state.bun).toBeNull();
    });

    it('should handle adding multiple ingredients', () => {
      let state = constructorReducer(initialState, addIngredient(mockMainIngredient));
      state = constructorReducer(state, addIngredient(mockSauceIngredient));

      expect(state.ingredients).toHaveLength(2);
      expect(state.ingredients[0]).toMatchObject(mockMainIngredient);
      expect(state.ingredients[1]).toMatchObject(mockSauceIngredient);
    });
  });

  describe('removeIngredient', () => {
    it('should remove ingredient by id', () => {
      // Создаем состояние с двумя разными ингредиентами
      const stateWithTwoIngredients = {
        bun: null,
        ingredients: [
          { ...mockMainIngredient, id: 'test-id-1' },
          { ...mockSauceIngredient, id: 'test-id-2' }
        ]
      };

      // Проверяем начальное состояние
      expect(stateWithTwoIngredients.ingredients).toHaveLength(2);

      // Удаляем первый ингредиент
      const action = removeIngredient('test-id-1');
      const finalState = constructorReducer(stateWithTwoIngredients, action);

      // Проверяем, что остался только второй ингредиент
      expect(finalState.ingredients).toHaveLength(1);
      expect(finalState.ingredients[0]).toMatchObject(mockSauceIngredient);
      expect(finalState.ingredients[0].id).toBe('test-id-2');
    });

    it('should remove ingredient from middle of list', () => {
      const stateWithThreeIngredients = {
        bun: null,
        ingredients: [
          { ...mockMainIngredient, id: 'test-id-1' },
          { ...mockSauceIngredient, id: 'test-id-2' },
          { ...mockMainIngredient, id: 'test-id-3', _id: 'main-3' }
        ]
      };

      // Удаляем второй ингредиент
      const action = removeIngredient('test-id-2');
      const finalState = constructorReducer(stateWithThreeIngredients, action);

      expect(finalState.ingredients).toHaveLength(2);
      expect(finalState.ingredients[0].id).toBe('test-id-1');
      expect(finalState.ingredients[1].id).toBe('test-id-3');
    });

    it('should not change state when removing non-existent ingredient', () => {
      const stateWithIngredient = {
        bun: null,
        ingredients: [
          { ...mockMainIngredient, id: 'test-id-1' }
        ]
      };
      const originalState = { ...stateWithIngredient };

      const action = removeIngredient('non-existent-id');
      const finalState = constructorReducer(stateWithIngredient, action);

      expect(finalState).toEqual(originalState);
    });
  });

  describe('moveIngredient', () => {
    it('should move ingredient to different position', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [
          { ...mockMainIngredient, id: 'test-id-1' },
          { ...mockSauceIngredient, id: 'test-id-2' }
        ]
      };

      const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.ingredients[0].id).toBe('test-id-2');
      expect(state.ingredients[1].id).toBe('test-id-1');
    });

    it('should not change state when moving to same position', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [
          { ...mockMainIngredient, id: 'test-id-1' },
          { ...mockSauceIngredient, id: 'test-id-2' }
        ]
      };
      const originalState = { ...stateWithIngredients };

      const action = moveIngredient({ fromIndex: 0, toIndex: 0 });
      const state = constructorReducer(stateWithIngredients, action);

      expect(state).toEqual(originalState);
    });

    it('should handle moving ingredient up', () => {
      const stateWithIngredients = {
        bun: null,
        ingredients: [
          { ...mockMainIngredient, id: 'test-id-1' },
          { ...mockSauceIngredient, id: 'test-id-2' },
          { ...mockMainIngredient, id: 'test-id-3', _id: 'main-3' }
        ]
      };

      // Перемещаем последний элемент на первую позицию
      const action = moveIngredient({ fromIndex: 2, toIndex: 0 });
      const state = constructorReducer(stateWithIngredients, action);

      expect(state.ingredients[0].id).toBe('test-id-3');
      expect(state.ingredients[1].id).toBe('test-id-1');
      expect(state.ingredients[2].id).toBe('test-id-2');
    });
  });

  describe('clearConstructor', () => {
    it('should clear all ingredients and bun', () => {
      const stateWithData = {
        bun: mockBun,
        ingredients: [
          { ...mockMainIngredient, id: 'test-id-1' },
          { ...mockSauceIngredient, id: 'test-id-2' }
        ]
      };

      const action = clearConstructor();
      const state = constructorReducer(stateWithData, action);

      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });
  });
});
