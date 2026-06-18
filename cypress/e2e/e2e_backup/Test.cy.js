import '@testing-library/cypress/add-commands';
import faker from 'faker';
import 'cypress-file-upload';


describe('Create New Transaction', () => {
  const scenarios = [
    { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').eft },
    { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').eft },
    { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').interac },
    { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').interac }
  ];

  before(() => {
    cy.loginB2C_CA();
  });

  it('Create EFT Pay, EFT Collect, Interac Pay and Interac Collect transactions', () => {
    scenarios.forEach((scenario) => {
      cy.get('#menu-item-transactions', { timeout: 25000 }).contains(Cypress.env('menu_items').item_transactions).click({ force: true });

      cy.contains('.nav-link .displayText', 'Transactions', { timeout: 15000 }).click({ force: true });
      cy.wait(2000)

      cy.contains('button', 'New Transaction', { timeout: 15000 }).click({ force: true });
      cy.wait(2000)

      cy.get('#drpMerchant', { timeout: 20000 })
  .should('exist')
  .scrollIntoView();

cy.get('#drpMerchant')
  .parent()
  .find('.e-ddl-icon')
  .click({ force: true });

cy.get('#drpMerchant_popup', { timeout: 20000 })
  .should('have.class', 'e-popup-open');

cy.get('#drpMerchant_popup')
  .contains('li', 'KPC_201-Pooja')
  .click({ force: true });

cy.get('#drpMerchant')
  .should('contain.value', 'KPC_201-Pooja');

      cy.get('#drpTransType').click({ force: true });
      cy.get('#drpTransType_popup').find('li').contains(scenario.type).click();

      cy.get('#drpTransMethod').click({ force: true });
      cy.get('#drpTransMethod_popup').find('li').contains(scenario.method).click();

      cy.get('#txtAmount').clear().type('0.07');
      cy.get('#txtMerchantRefNumber').clear().type('123456');
      cy.get('#txtDescriptions').clear().type('This is a cypress test automation');

      if (
        scenario.type === Cypress.env('transaction_type').type_pay &&
        scenario.method === Cypress.env('transaction_methods').interac
      ) {
        cy.get('#txtQuestion').clear().type('What is your favorite color?');
        cy.get('#txtAnswer').clear().type('Yellow');
      }

      cy.get('#add-transaction-button-search-customer').click({ force: true });

      cy.get('#fltCustomerInfo', { timeout: 15000 })
        .clear()
        .type('7416952');

      cy.contains('tr', '7416952', { timeout: 15000 })
        .should('be.visible')
        .then($row => {
          cy.wrap($row).find('td').first().click({ force: true });
        });
cy.wait(3000)
      cy.get('#add-transaction-schedule-transaction-info-button-save > span', { timeout: 15000 }).click({ force: true });

      cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok', { timeout: 15000 }).should('be.visible')
        .click({ force: true });

      cy.get('button.transaction-is-created', { timeout: 15000 }).should('be.visible').click({ force: true });

      cy.wait(8000)
    });
  });
});
