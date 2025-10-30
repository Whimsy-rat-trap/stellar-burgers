import store from '../store';

describe('rootReducer', () => {
  it('should initialize with correct state structure', () => {
    const state = store.getState();

    expect(state).toHaveProperty('auth');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('profileOrders');
    expect(state).toHaveProperty('ingredientDetails');
  });
});
