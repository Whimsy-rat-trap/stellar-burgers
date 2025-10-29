describe('Burger Constructor', () => {
  beforeEach(() => {
    // Перехватываем запросы и возвращаем моковые данные
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    // Устанавливаем токен авторизации
    cy.setCookie('accessToken', 'test-access-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');

    // Переходим на главную страницу
    cy.visit('/');

    // Ждем загрузки ингредиентов
    cy.wait('@getIngredients');
  });

  it('should load ingredients successfully', () => {
    // Проверяем наличие категорий ингредиентов
    cy.contains('Булки').should('be.visible');
    cy.contains('Соусы').should('be.visible');
    cy.contains('Начинки').should('be.visible');

    // Прокручиваем к конкретным ингредиентам и проверяем их
    cy.contains('Краторная булка N-200i').scrollIntoView().should('be.visible');
    cy.contains('Биокотлета из марсианской Магнолии').scrollIntoView().should('be.visible');
    cy.contains('Соус Spicy-X').scrollIntoView().should('be.visible');
  });

  it('should add bun to constructor', () => {
    // Добавляем булку в конструктор
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    // Проверяем, что булка добавилась в конструктор
    cy.get('section').contains('Краторная булка N-200i (верх)').should('be.visible');
    cy.get('section').contains('Краторная булка N-200i (низ)').should('be.visible');
  });

  it('should add main ingredient to constructor', () => {
    // Добавляем булку
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    // Добавляем начинку
    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    // Проверяем, что начинка добавилась в конструктор
    cy.get('section')
      .contains('Биокотлета из марсианской Магнолии')
      .should('be.visible');
  });

  it('should add sauce to constructor', () => {
    // Добавляем булку
    cy.contains('Краторная булка N-200i')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    // Добавляем соус
    cy.contains('Соус Spicy-X')
      .parent()
      .find('button')
      .contains('Добавить')
      .click();

    // Проверяем, что соус добавился в конструктор
    cy.get('section').contains('Соус Spicy-X').should('be.visible');
  });

  describe('Modal Windows', () => {
    it('should open and close ingredient modal by close button', () => {
      // Кликаем на ингредиент для открытия модального окна
      cy.contains('Краторная булка N-200i').click();

      // Проверяем, что модальное окно открылось
      cy.contains('Детали ингредиента').should('be.visible');

      // Более надежный способ найти модальное окно - ищем по тексту заголовка
      cy.contains('Детали ингредиента')
        .parentsUntil('[class*="modal"]')
        .last()
        .as('modal');

      // Закрываем модальное окно по крестику
      // Ищем кнопку закрытия в заголовке модального окна
      cy.get('@modal').within(() => {
        // Ищем кнопку закрытия - обычно это последняя кнопка в заголовке
        cy.get('button').last().click();
      });

      // Проверяем, что модальное окно закрылось
      cy.contains('Детали ингредиента').should('not.exist');
    });

    it('should close ingredient modal by overlay click', () => {
      // Кликаем на ингредиент
      cy.contains('Краторная булка N-200i').click();

      // Проверяем, что модальное окно открылось
      cy.contains('Детали ингредиента').should('be.visible');

      // Закрываем модальное окно по клику на оверлей
      // Вместо поиска по классу используем координаты клика вне модального окна
      // Кликаем в левый верхний угол экрана (скорее всего это будет оверлей)
      cy.get('body').click(10, 10);

      // Альтернативный вариант - клик по координатам, которые точно вне модалки
      // cy.get('body').click(100, 100);

      // Проверяем, что модальное окно закрылось
      cy.contains('Детали ингредиента').should('not.exist');
    });

    it('should close ingredient modal by ESC key', () => {
      // Кликаем на ингредиент
      cy.contains('Краторная булка N-200i').click();

      // Проверяем, что модальное окно открылось
      cy.contains('Детали ингредиента').should('be.visible');

      // Закрываем модальное окно по ESC
      cy.get('body').type('{esc}');

      // Проверяем, что модальное окно закрылось
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });

  describe('Order Creation', () => {
    it('should create order successfully and clear constructor after close', () => {
      // Добавляем булку и начинку в конструктор
      cy.contains('Краторная булка N-200i')
        .parent()
        .find('button')
        .contains('Добавить')
        .click();
      cy.contains('Биокотлета из марсианской Магнолии')
        .parent()
        .find('button')
        .contains('Добавить')
        .click();

      // Проверяем, что ингредиенты добавились в конструктор
      cy.get('section').contains('Краторная булка N-200i (верх)').should('be.visible');
      cy.get('section').contains('Биокотлета из марсианской Магнолии').should('be.visible');

      // Нажимаем кнопку "Оформить заказ"
      cy.contains('button', 'Оформить заказ').click();

      // Проверяем, что открылось модальное окно с номером заказа
      cy.wait('@createOrder');
      cy.contains('идентификатор заказа').should('be.visible');
      cy.contains('12345').should('be.visible');

      // Закрываем модальное окно
      cy.get('body').type('{esc}');

      // Проверяем, что модальное окно закрылось
      cy.contains('идентификатор заказа').should('not.exist');

      // Ждем немного для завершения анимации/обновления состояния
      cy.wait(1000);

      // Проверяем, что конструктор очистился - ищем сообщения о пустом конструкторе
      // Вместо проверки отсутствия элементов проверяем наличие сообщений о пустом состоянии
      cy.contains('Выберите булки').should('be.visible');
      cy.contains('Выберите начинку').should('be.visible');

      // Альтернативно: проверяем, что кнопка оформления заказа снова доступна
      cy.contains('button', 'Оформить заказ').should('be.enabled');
    });

    it('should redirect to login when creating order without auth', () => {
      // Очищаем авторизацию
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');

      // Перехватываем запрос пользователя как неавторизованный
      cy.intercept('GET', 'api/auth/user', { statusCode: 401 }).as(
        'getUserUnauthorized'
      );

      // Перезагружаем страницу
      cy.reload();
      cy.wait('@getIngredients');

      // Добавляем булку и начинку
      cy.contains('Краторная булка N-200i')
        .parent()
        .find('button')
        .contains('Добавить')
        .click();
      cy.contains('Биокотлета из марсианской Магнолии')
        .parent()
        .find('button')
        .contains('Добавить')
        .click();

      // Нажимаем кнопку "Оформить заказ"
      cy.contains('button', 'Оформить заказ').click();

      // Проверяем, что произошел редирект на страницу логина
      cy.url().should('include', '/login');
    });
  });
});
