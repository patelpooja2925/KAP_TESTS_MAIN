import '@testing-library/cypress/add-commands';
import faker from 'faker';
import 'cypress-file-upload';

describe('Canada Tests', () => {

  beforeEach(() => {
    cy.loginB2C_US()
  })

    it('Create PBL Transaction', () => {
        cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                        cy.wait(5000)
                            cy.contains('.nav-link .displayText', 'Transactions').click({ force: true });
                        cy.get('#menu-item-transactions').click({force:true})
                        cy.wait(5000)
        cy.get('.displayText').contains('Payment Links').click({ force: true });
        cy.contains('button', 'Create Payment Link').should('be.visible').click({force:true});
cy.contains('label', 'Merchant')
  .parents('.e-ddl')
  .click({ force: true });

cy.contains('.e-list-item', 'KPC_201-Kirk').click({ force: true });

const paymentMethods = ['ACH'];

paymentMethods.forEach(method => {
  cy.get('#id-ss-transaction-management-input-merchant')
    .parents('.e-multi-select-wrapper')
    .click({ force: true });

  cy.contains('.e-list-item', method)
    .scrollIntoView()
    .click({ force: true });
});
cy.get('#txtAmount').clear() .type('125.50')
      
cy.contains('label', 'Expire after first payment').find('.e-frame').click({ force: true })
cy.wait(5000)
cy.get('input[type="checkbox"]').should('be.checked')

cy.wait(3000)
  cy.contains('button', 'Next: Select Customers').should('be.visible').click({force:true});
cy.wait(3000)
cy.get('input[placeholder="Search Name, Email or Phone Number"]').type('Pooja@kapitalinc.com').click({force:true})
cy.contains('td', 'Pooja@kapitalinc.com').parents('tr').find('.e-frame').click({ force: true })
cy.contains('button', 'Generate Payment Link').should('be.visible') .click({force:true})
cy.get('.qr-code-button-primary').click({ force: true })
  })

})