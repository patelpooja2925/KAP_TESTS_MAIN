import '@testing-library/cypress/add-commands'
describe('Search  Transaction ', () => {
    const today = new Date().toLocaleDateString('en-US');
    const numTransactions = 1;
    const transactionmngScenarios = [
        { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').eft },
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').eft },
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').interac },
        { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').interac }
    ];
    for (let i = 0; i < numTransactions; i++) {
        transactionmngScenarios.forEach((scenario) => {
    it(`Search Transactions in Transaction Management- ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
        
    
        cy.visit(Cypress.env('baseurl'))
               
                cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
                cy.get('#email').type(Cypress.env('credentials').login_username)
                cy.get('input[id="password"]').type(Cypress.env('credentials').login_password) ///provide correct password when running script
                cy.get('#next').click()
                cy.wait(10000)
            
            })
            cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click()
            cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click()
            cy.wait(2000)
            cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click()
            cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click()
            cy.get('#transaction-management-input-mechant').click({force: true})
           
            cy.get('#transaction-management-input-mechant_13').contains('KPC_201-Pooja').click({ force: true });

            //cy.get('#transaction-management-input-transaction-id').click({force: true})
           //cy.get('#transaction-management-input-customer-name').click({force: true})
           //cy.get('#transaction-management-input-customer-email').click({force: true})
          // cy.get('#transaction-management-input-amount').click({force: true})
          cy.get('#transaction-management-input-type').click({ force: true });
                        cy.get('#transaction-management-input-type_popup').find('li').contains(scenario.type).click({ force: true });
        
                        cy.get('#transaction-management-input-payment-method').click({ force: true });
                        cy.get('#transaction-management-input-payment-method_popup').find('li').contains(scenario.method).click({ force: true });
        

          cy.get('#transaction-management-input-status').click({force: true})
          cy.get('#transaction-management-input-status_1').click({force: true})


          //cy.get('#transaction-management-input-source').click({force: true})
          //cy.get('#transaction-management-input-source_1').click({force: true})
            

          const today = new Date();
          const dd = String(today.getDate()).padStart(2, '0');
          const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
          const yyyy = today.getFullYear();
          
          const startDate = `${mm}/${dd}/${yyyy}`;
          const endDate = startDate; // Set endDate to be the same as startDate
          
          console.log('Start Date:', startDate);
          console.log('End Date:', endDate);


           cy.get('#transaction-management-input-transaction-start-date').click({force: true})
           .clear()
            .type(startDate) // Replace with the desired date format if needed
            .trigger('blur');
       
          cy.get('#transaction-management-input-transaction-end-date').click({force: true})


          .clear()
                .type(endDate) // Replace with the desired date format if needed
                .trigger('blur');
          //cy.get('#transaction-management-input-declined-start-date').click({force: true})
           //cy.get('#transaction-management-input-declined-end-date').click({force: true})
            cy.get('#transaction-management-button-search').click({force: true})

           //cy.get('#transaction-management-button-clear').click({force: true})
           //cy.get('#transaction-management-button-download').click({force: true})
           //cy.get('.e-dropdown-menu > :nth-child(1)').click({force:true})
        
            cy.wait(5000)
        })})}
    })