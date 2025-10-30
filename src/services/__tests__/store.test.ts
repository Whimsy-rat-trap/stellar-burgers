import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../slices/ingredientsSlice';
import constructorReducer from '../slices/constructorSlice';
import orderReducer from '../slices/orderSlice';
import authReducer from '../slices/authSlice';
import feedReducer from '../slices/feedSlice';
import profileOrdersReducer from '../slices/profileOrdersSlice';
import ingredientDetailsReducer from '../slices/ingredientDetailsSlice';

// Имитируем структуру rootReducer
const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  auth: authReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  ingredientDetails: ingredientDetailsReducer
});

describe('rootReducer', () => {
  it('should properly initialize with combined reducers', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('profileOrders');
    expect(initialState).toHaveProperty('ingredientDetails');

    // Проверяем начальные состояния каждого редьюсера
    expect(initialState.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });

    expect(initialState.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(initialState.order).toEqual({
      orderRequest: false,
      orderModalData: null,
      error: null
    });
  });

  it('should handle unknown action types without errors', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    const newState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });

    expect(newState).toEqual(initialState);
  });
});
