import '@testing-library/jest-dom';

// Моки для тестов
global.fetch = jest.fn();

// Мок для uuid
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid')
}));

// Мок для ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

// Мок для IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

// Очистка моков после каждого теста
afterEach(() => {
  jest.clearAllMocks();
});
