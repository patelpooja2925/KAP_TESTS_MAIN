    import '@testing-library/cypress/add-commands'
    describe('Create New Transaction ', () => {
        it('Add a new customer transaction - Collect Transaction - CC', () => {
            
        
                cy.visit(Cypress.env('baseurl'))
                  
                    cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
                    cy.get('#email').type(Cypress.env('credentials').login_username)
                    cy.get('input[id="password"]').type(Cypress.env('credentials').login_password) ///provide correct password when running script
                    cy.get('#next').click()
                    cy.wait(5000)
                
                })
                cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click()
                cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click()
                cy.wait(10000)
                cy.get('#Grid_add2').click({force: true})
                cy.wait(10000)
                cy.get('#drpMerchant').click({force: true})
                cy.get('#drpMerchant_popup').find('li').contains('KPC_201-Pooja').click({force: true})
                cy.get('#drpTransType').click({force: true})
                cy.get('#drpTransType_popup').find('li').contains(Cypress.env('transaction_type').type_collect).click({force: true})
                cy.get('#drpTransMethod').click({force: true})
                cy.get('#drpTransMethod_popup').find('li').contains(Cypress.env('transaction_methods').credit_card).click({force: true})
                cy.get('#txtAmount').clear().type('1.34')
                cy.get('#txtMerchantRefNumber').clear().type('123456')
                cy.get('#txtDescriptions').clear().type('This is a cypress test automation')
                cy.get('#add-transaction-button-add-customer').click({force: true})
                //cy.wait(2000)
                
                cy.get('#txtFirstName').type('cypressCC')
                cy.get('#txtLastName').type('testCC')
                cy.get('#txtEmail').type('CCcypress@gmail.com')
                cy.get('#txtPhone').click({force: true})

    cy.get('#txtPhone')
    .invoke('val','434-979-2908')
    .trigger('input')
    .trigger('blur')
    //cy.get('#txtPhone')
    .should('have.value',"434-979-2908",{timeout:4000})

                cy.get('#txtAddress1').type('Mirabel')
                cy.get('#txtAddress2').type('Unit 10')
                cy.get('#drpState').click({force: true})
                cy.get('#drpState_popup').find('li').contains(Cypress.env('province').ns).click({force: true})
                cy.get('#txtCity').type('Mirabel')
                cy.get('#txtZip').click({force:true})
                cy.get('#txtZip')
                .invoke('val','H3W-1P9')
    .trigger('input')
    .trigger('blur')
    cy.get('#txtZip')
    .should('have.value',"H3W-1P9",{timeout:10000})
    cy.get('iframe').then($iframe => {
        const iframe = $iframe.contents()
        const myInput = iframe.find('input[id^="element:CARD_NUMBER"]')
        cy.wrap(myInput).type("4111 1111 1111 1111");
      });

    
        // Type into expiry input
        cy.get('#txtExpirationDate').click({force:true},{timeout:10000})
        .invoke('val','12/24')
        .trigger('input')
    .trigger('blur')
        .should('have.value', '12/24');

        cy.get('#cardCvv').click({force:true},{timeout:10000})//iframe, unable to fetch id
        .invoke('val','4111 1111 1111 1111')
        .trigger('input')
        .trigger('blur')
            .should('have.value', '999');   

                cy.get('#add-transaction-schedule-transaction-info-button-save').click({force: true})
                cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible',{timeout:4000}).click({force: true})
                cy.get('#.e-footer-content > .e-control').click()
              })})