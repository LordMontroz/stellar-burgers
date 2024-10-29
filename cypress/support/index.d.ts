// Импорт типов Cypress для расширения
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
      closeModal(): Chainable<Subject>;
      addIngredients(ingredientIdArr: Array<number>): Chainable<Subject>;
      clickIngredient(ingredientId: string): Chainable<Subject>;
      isModalIngredient(check: boolean): Chainable<Subject>;
    }
  }
