import '@testing-library/cypress/add-commands';
import faker from 'faker';
import 'cypress-file-upload';

describe('CA Prod Login', () => {
 
  const numTransactions = 1; // Change this to the number of transactions you want to create
 
    

    const ExistingtransactionScenarios = [
        { type: Cypress.expose('transaction_type').type_pay, method: Cypress.expose('transaction_methods').eft },
      // { type: Cypress.expose('transaction_type').type_collect, method: Cypress.expose('transaction_methods').eft },
        //{ type: Cypress.expose('transaction_type').type_collect, method: Cypress.expose('transaction_methods').interac },
        //{ type: Cypress.expose('transaction_type').type_pay, method: Cypress.expose('transaction_methods').interac }
    ];
    
    const today = new Date().toLocaleDateString('en-US');
    for (let i = 0; i < numTransactions; i++) {
     
       ExistingtransactionScenarios.forEach((scenario) => {
                            it(`Search customer transaction For - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
                    cy.loginB2C_CAProd();
             cy.get('#menu-item-transactions').contains(Cypress.expose('menu_items').item_transactions).click();
                cy.wait(5000)
                    cy.contains('.nav-link .displayText', 'Transactions').click({ force: true });
                //cy.get('#menu-item-transaction-management').contains(Cypress.expose('menu_item_transactions').item_transaction_management).click({force:true});
                cy.wait(5000);
                cy.contains('button', 'New Transaction').click({ force: true });

                //cy.get('#Grid_add2').click({force:true});
                cy.wait(3000);
                            cy.get('#drpMerchant').click({ force: true });
                            cy.get('#drpMerchant_popup').find('li').contains('KPC_201-KPCHRG').click();
                            cy.wait(1000);
            
                            cy.get('#drpTransType').click({ force: true });
                            cy.get('#drpTransType_popup').find('li').contains(scenario.type).click();
            
                            cy.get('#drpTransMethod').click({ force: true });
                            cy.get('#drpTransMethod_popup').find('li').contains(scenario.method).click();
            
            
            
                            cy.get('#txtAmount').clear().type('0.00');
                            cy.get('#txtMerchantRefNumber').clear().type('TestProdcypressautomation').click({ force: true });
                            cy.get('#txtDescriptions').clear().type('This is a cypress Prod Automation');
                            
                            if (scenario.type === Cypress.expose('transaction_type').type_pay && scenario.method === Cypress.expose('transaction_methods').interac) {
                                cy.get('#txtQuestion').type('What is your favorite color?');
                                cy.get('#txtAnswer').type('Yellow');
                                cy.wait(2000);
                            }
            
                            cy.get('#add-transaction-button-search-customer').click({ force: true });
                            cy.wait(2000)
                            
                           
                           cy.wait(8000)// optional, to ensure field is empty
 cy.get('#fltCustomerInfo')
  .clear()
  .type('56567567');

cy.contains('tr', '56567567', { timeout: 15000 })
  .should('be.visible')
  .then($row => {
    cy.wrap($row).find('td').first().click({ force: true });
    cy.wait(3000);
   
  });
cy.wait(1000);

                     cy.get('#add-transaction-schedule-transaction-info-button-save > span').click({ force: true });

cy.get('button.transaction-is-created', { timeout: 15000 }).should('be.visible').click({ force: true });
         
})
})

    }})