import '@testing-library/cypress/add-commands';

describe('Create wallet transactions', () => {
    // Define the tests as functions
   const walletDepositTest = () => {
        it('Wallet Cancel', () => {
            cy.visit(Cypress.env('baseurl'));
            cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
                cy.get('#email').type(Cypress.env('credentials').login_username);
                cy.get('input[id="password"]').type(Cypress.env('credentials').login_password);
                cy.get('#next').click();
                cy.wait(5000);
            });
            cy.get('#menu-item-wallets').click({ force: true });
            cy.get('#menu-item-wallet-transfer').click({force:true})
      cy.get('[id^="sfdropdownbutton"] > .fa').first().click({ force: true });



            
            // Step 2: Click the "Cancel All" option
            cy.get('#cancel-wallet-transfer').click({force:true})
            cy.wait(1000)
            cy.get('.e-footer-content > .e-primary').click({force:true})
              cy.wait(5000)
        });
    };

    

    
    // Loop to run the tests twice
    for (let i = 0; i < 1; i++) {
        walletDepositTest();
       
    }
});
