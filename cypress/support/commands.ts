/// <reference types="cypress" />

import * as OrderFixture from '../fixtures/order.json';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
  })

//Закрываем модальное окно по нажатию на крестик (сделано)
Cypress.Commands.add('closeModal', () => {
    cy.get('[data-cy=modal-close]').click();
  });
  
//   //Добавляем ингредиент в конструктор
//   Cypress.Commands.add('addIngredients', (TTabMode) => {
//     ingredientIdArr.forEach((id) => {
//       cy.get(`[data-cy=TTabMode-${id}]`).contains('Добавить').click();
//     });
//   });
  
  //Кликаем на ингредиент
  Cypress.Commands.add('clickIngredient', (TTabMode) => {
    cy.get(`[data-cy=${TTabMode}] button`).first().click();
  });
  
  //Проверяем открыто/закрыто ли модальное окно ингредиента (cделано)
  Cypress.Commands.add('isModalIngredient', (check) => {
      const checkExist = check ? 'exist' : 'not.exist';
      cy.contains(OrderFixture.order.number).should(checkExist);
  });
