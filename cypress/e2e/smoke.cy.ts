describe('Smoke Test', () => {
  it('should load the application', () => {
    cy.visit('/');
    cy.contains('Соберите бургер').should('be.visible');
  });
});
