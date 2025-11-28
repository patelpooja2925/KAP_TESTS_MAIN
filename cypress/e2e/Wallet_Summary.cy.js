import '@testing-library/cypress/add-commands'
const today = new Date().toLocaleDateString('en-US');
describe('Create New Transaction ', () => {
    it('Add a new customer transaction - Collect Transaction - EFT', () => {
        
    
            cy.visit(Cypress.env('baseurl'))
               
                cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
                cy.get('#email').type(Cypress.env('credentials').login_username)
                cy.get('input[id="password"]').type(Cypress.env('credentials').login_password) ///provide correct password when running script
                cy.get('#next').click()
                cy.wait(10000)
                })
             cy.get('#menu-item-wallets').contains(Cypress.env('menu_items').item_wallets).click()
             cy.get('#menu-item-wallet-summary').contains(Cypress.env('menu_item_wallets').item_wallet_summary).click()
      cy.get('#wallet-summary-input-merchant').click({force: true})
      cy.get('#wallet-summary-input-merchant_options').find('li').contains('KPC_201-Pooja').click({force: true})
      cy.get('#wallet-summary-input-event-type').click({force: true})
      cy.get('#wallet-summary-input-event-type_options').find('li').contains('Deposit').click({force: true})
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();
      const startDate =`${mm}/${dd}/${yyyy}`;
      

      const endDd = String(today.getDate()).padStart(2, '0');
      const endMm = String(today.getMonth() + 1).padStart(2, '0');
      const endYyyy = today.getFullYear();
      const endDate = `${endMm}/${endDd}/${endYyyy}`;
      cy.get('#wallet-summary-input-start-date').click({force:true})
      .clear()
      .type(startDate) // Replace with the desired date format if needed
      .trigger('blur');
      cy.get('#wallet-summary-input-end-date').click({force:true})
      .clear()
      .type(endDate) // Replace with the desired date format if needed
      .trigger('blur');
      cy.get('#wallet-summary-button-search').click()
      cy.wait(3000)

  //cy.get('#wallet-summary-button-clear').click()
  cy.get('#wallet-summary-button-download').click({force:true})
  cy.get('.e-dropdown-menu > :nth-child(1)').click({force:true})

                })})