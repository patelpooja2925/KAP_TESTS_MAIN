import '@testing-library/cypress/add-commands';
import faker from 'faker';
import 'cypress-file-upload';

describe('Create New Transaction', () => {
    const numTransactions = 1; // Change this to the number of transactions you want to create
    const ExistingtransactionScenarios = [
        { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').eft },
      // { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').eft },
      //  { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').interac },
       { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').interac }
    ];
    
    const today = new Date().toLocaleDateString('en-US');
    for (let i = 0; i < numTransactions; i++) {
     

                    
                        ExistingtransactionScenarios.forEach((scenario) => {
                            it(`Search customer transaction For - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
                    cy.visit(Cypress.env('baseurl'));
                    
                    cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
                        cy.get('#email').type(Cypress.env('credentials').login_username);
                         
                        cy.get('input[id="password"]').type(Cypress.env('credentials').login_password);
                        cy.get('#next').click();
                        cy.wait(10000);
                    });
            
                            cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                            cy.wait(5000)
                            cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click();
                            cy.wait(5000);
                            cy.get('#Grid_add2').click({ force: true });
                            cy.wait(2000);
                            cy.get('#drpMerchant').click({ force: true });
                            cy.get('#drpMerchant_popup').find('li').contains('KPC_201-Pooja').click();
                            cy.wait(1000);
            
                            cy.get('#drpTransType').click({ force: true });
                            cy.get('#drpTransType_popup').find('li').contains(scenario.type).click();
            
                            cy.get('#drpTransMethod').click({ force: true });
                            cy.get('#drpTransMethod_popup').find('li').contains(scenario.method).click();
            
            
            
                            cy.get('#txtAmount').clear().type('0.07');
                            cy.get('#txtMerchantRefNumber').clear().type('123456').click({ force: true });
                            cy.get('#txtDescriptions').clear().type('This is a cypress test automation');
                            
                            if (scenario.type === Cypress.env('transaction_type').type_pay && scenario.method === Cypress.env('transaction_methods').interac) {
                                cy.get('#txtQuestion').type('What is your favorite color?');
                                cy.get('#txtAnswer').type('Yellow');
                                cy.wait(2000);
                            }
            
                            cy.get('#add-transaction-button-search-customer').click({ force: true });
                            cy.get('#fltCustomerInfo').click({force:true}).type('poojatest1@gmail.com') 

                            cy.contains('td', 'poojatest1@gmail.com')
                            .should('be.visible', { timeout: 4000 })
                            .click()
                          
                            cy.wait(4000)
                      cy.get('#add-transaction-schedule-transaction-info-button-save').click({ force: true });
                    
                            cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible', { timeout: 4000 }).click({ force: true });
                            cy.wait(1000)
                          
                            cy.get('.e-footer-content > .e-control').click();
                            cy.wait(1000)
                })
            
            })}})
        

             