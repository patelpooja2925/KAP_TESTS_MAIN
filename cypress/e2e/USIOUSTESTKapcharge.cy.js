import '@testing-library/cypress/add-commands';
import faker from 'faker';
import 'cypress-file-upload';

describe('Create New Transaction', () => {
    const numTransactions = 1; // Change this to the number of transactions you want to create
    const transactionScenarios = [
        { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').ach },
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').ach },
       // { type: Cypress.env('transaction_type').type_prenote, method: Cypress.env('transaction_methods').ach },
        
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').rcc },
        
    ];
    const ExistingtransactionScenarios = [
        { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').ach },
       { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').ach },
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').rcc },
        
    ];

    const SameDayACHScenarios = [
        { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').ach },
       { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').ach },
      // { type: Cypress.env('transaction_type').type_prenote, method: Cypress.env('transaction_methods').ach }, 
        
    ];
  
    const today = new Date().toLocaleDateString('en-US');
    for (let i = 0; i < numTransactions; i++) {
      transactionScenarios.forEach((scenario) => {
            it(`Add a new customer transaction - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
                const randomFirstName = faker.name.firstName();
                const randomLastName = faker.name.lastName();
             
                const randomEmail = faker.internet.email();
                const randomPhoneNumber = faker.phone.phoneNumber('###-###-####');
                const randomZipCode = faker.address.zipCode('#####');

cy.loginB2C_US();
    cy.wait(10000)            

                

                cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                cy.wait(3000)
               // cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({force:true});
                cy.contains('.nav-link .displayText', 'Transactions').click({ force: true });
                //cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({force:true});
            
               cy.wait(3000);
                cy.contains('button', 'New Transaction').click({ force: true });
cy.wait(5000)
                cy.get('#drpMerchant').click({force:true});
                cy.get('#drpMerchant_popup').contains('KPC_201-Kirk').click();
                //cy.wait(5000);

                cy.get('#drpTransType').click({force:true});
                cy.get('#drpTransType_popup').find('li').contains(scenario.type).click();
                if (scenario.type === Cypress.env('transaction_type').type_prenote) {
                    // For 'prenote', skip the amount field and focus on merchant reference
                    cy.get('#txtMerchantRefNumber').type('123456');
                } else {
                    cy.get('#txtAmount').clear().type('50.00').click({force:true})
                    cy.get('#txtMerchantRefNumber').type('123456');
                }
                cy.get('#drpTransMethod').click({ force: true });
                cy.get('#drpTransMethod_popup').find('li').contains(scenario.method).click();


                cy.get('#txtMerchantRefNumber').type('123456');
                cy.get('#txtDescriptions').clear().type('This is a  US Platform cypress test automation');
                cy.get('#add-transaction-button-add-customer').click({force:true});

             

                cy.get('#txtFirstName').type(randomFirstName);
                cy.get('#txtLastName').type(randomLastName);
                cy.get('#txtEmail').type(randomEmail);
                cy.get('#txtPhone').click({force:true});
                cy.get('#txtPhone')
                    .invoke('val', randomPhoneNumber)
                    .trigger('input')
                    .trigger('blur');
                cy.get('#txtPhone')
                    .should('have.value', randomPhoneNumber, { timeout: 1000 });
                cy.get('#txtAddress1').type('423 street');
                cy.get('#txtAddress2').type('Unit 7');

                // Select a random province
                cy.get('#drpState').click({ force: true });
const province = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
const randomProvince = province[Math.floor(Math.random() * province.length)];
cy.get('#drpState_popup').find('li').contains(randomProvince).click();

                cy.get('#txtCity').type('NewYork');
                cy.get('#txtZip').click({force:true});
                cy.get('#txtZip').invoke('val', randomZipCode).trigger('input').trigger('blur');
                cy.get('#txtZip').should('have.value', randomZipCode, { timeout: 10000 });
              
                cy.get('#bank-account-type').click({force:true});
                cy.get('#bank-account-type_popup').find('li').contains('Personal Checking').click();

               
                cy.get('#txtTransitNumber').type('555555550');
                cy.get('#txtAccountNumber').type('424785414');
               cy.get('#add-transaction-schedule-transaction-info-button-save > span').click({ force: true });
                cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible', { timeout: 4000 }).click({force:true});
                cy.wait(1000)
                cy.get('.e-footer-content > .e-control').click({force:true});
                cy.wait(1000)
            });

        })

        ExistingtransactionScenarios.forEach((scenario) => {
            it(`Search customer transaction For - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
   
    cy.loginB2C_US();
    
    cy.wait(10000)

            cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
            cy.wait(2000)
            cy.contains('.nav-link .displayText', 'Transactions').click({ force: true });
                //cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({force:true});
                cy.wait(10000);
                cy.contains('button', 'New Transaction').click({ force: true });

            cy.get('#drpMerchant').click({ force: true });
            cy.get('#drpMerchant_popup').find('li').contains('KPC_201-Kirk').click();
            cy.wait(1000);

            cy.get('#drpTransType').click({ force: true });
            cy.get('#drpTransType_popup').find('li').contains(scenario.type).click();

            cy.get('#drpTransMethod').click({ force: true });
            cy.get('#drpTransMethod_popup').find('li').contains(scenario.method).click();



            cy.get('#txtAmount').clear().type('20.15');
            cy.get('#txtMerchantRefNumber').clear().type('123456').click({ force: true });
            cy.get('#txtDescriptions').clear().type('This is a cypress test automation');
       
            cy.get('#add-transaction-button-search-customer').click({ force: true });
           
            cy.get('#fltCustomerInfo').click({force:true}).type('Mckenzie.Mueller2@yahoo.com') 

            cy.contains('td', 'Mckenzie.Mueller2@yahoo.com').should('be.visible', { timeout: 4000 }).click({force:true})
            cy.wait(4000)
    cy.get('#add-transaction-schedule-transaction-info-button-save > span').click({ force: true });
    
            cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible', { timeout: 4000 }).click({ force: true });
            cy.wait(1000)
          
            cy.get('.e-footer-content > .e-control').click();
            cy.wait(1000)
})
})

SameDayACHScenarios.forEach((scenario) => {
                it(`Add a new  SD customer transaction - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
                    const randomFirstName = faker.name.firstName();
                    const randomLastName = faker.name.lastName();
                 
                    const randomEmail = faker.internet.email();
                    const randomPhoneNumber = faker.phone.phoneNumber('###-###-####');
                    const randomZipCode = faker.address.zipCode('#####');
    
    
                 cy.loginB2C_US();
                    
    cy.wait(10000)
                    cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                    cy.wait(3000)
                    cy.contains('.nav-link .displayText', 'Transactions').click({ force: true });
                //cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({force:true});
                cy.wait(10000);
                cy.contains('button', 'New Transaction').click({ force: true });

                    cy.get('#drpMerchant').click({force:true});
                    cy.get('#drpMerchant_popup').contains('KPC_201-Kevin').click();
                    //cy.wait(5000);
    
                    cy.get('#drpTransType').click({force:true});
                    cy.get('#drpTransType_popup').find('li').contains(scenario.type).click();
                    if (scenario.type === Cypress.env('transaction_type').type_prenote) {
                        // For 'prenote', skip the amount field and focus on merchant reference
                        cy.get('#txtMerchantRefNumber').type('123456');
                    } else {
                        cy.get('#txtAmount').clear().type('25.00').click({force:true})
                        cy.get('#txtMerchantRefNumber').type('123456');
                    }
                    cy.get('#drpTransMethod').click({ force: true });
                    cy.get('#drpTransMethod_popup').find('li').contains(scenario.method).click();
    
    
                    cy.get('#txtMerchantRefNumber').type('123456');
                    cy.get('#txtDescriptions').clear().type('This is a  US Platform cypress test automation');


                    cy.contains('span.e-label', 'Same Day ACH').click({force:true});

                    cy.get('#add-transaction-button-add-customer').click({force:true});
    
                cy.get('#txtFirstName').type(randomFirstName);
                    cy.get('#txtLastName').type(randomLastName);
                    cy.get('#txtEmail').type(randomEmail);
                    cy.get('#txtPhone').click({force:true});
                    cy.get('#txtPhone')
                        .invoke('val', randomPhoneNumber)
                        .trigger('input')
                        .trigger('blur');
                    cy.get('#txtPhone')
                        .should('have.value', randomPhoneNumber, { timeout: 1000 });
                    cy.get('#txtAddress1').type('423 street');
                    cy.get('#txtAddress2').type('Unit 7');
    
                    // Select a random province
                    cy.get('#drpState').click({ force: true });
    const province = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    const randomProvince = province[Math.floor(Math.random() * province.length)];
    cy.get('#drpState_popup').find('li').contains(randomProvince).click();
    
                    cy.get('#txtCity').type('NewYork');
                    cy.get('#txtZip').click({force:true});
                    cy.get('#txtZip').invoke('val', randomZipCode).trigger('input').trigger('blur');
                    cy.get('#txtZip').should('have.value', randomZipCode, { timeout: 10000 });
                  
                    cy.get('#bank-account-type').click({force:true});
                    cy.get('#bank-account-type_popup').find('li').contains('Personal Checking').click();
    
                   
                    cy.get('#txtTransitNumber').type('555555550');
                    cy.get('#txtAccountNumber').type('424785414');
                
              cy.get('#add-transaction-schedule-transaction-info-button-save > span').click({ force: true });
                    cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible', { timeout: 4000 }).click({force:true});

                    cy.wait(1000)

                    cy.get('.e-footer-content > .e-control').click({force:true});
                    cy.wait(1000)
                });
    
            })





            

            describe('Create wallet transactions', () => {
                // Define the tests as functions
               const walletDepositTest = () => {
                    it('Wallet Deposit', () => {
                         cy.loginB2C_US();
                         cy.wait(10000)
                        cy.get('#menu-item-wallets').click({ force: true });
                        cy.get('#menu-item-wallet-transfer').click({ force: true });
                        cy.get('#transfer_funds').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-operation-type').click({ force: true });
                        cy.get('li', { timeout: 10000 }).should('be.visible');
                        cy.get('#wallet-transfer-transfer-funds-input-to-wallet').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-to-wallet_20').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-from-bank').should('be.visible', { timeout: 4000 }).click({ force: true });
                         cy.get('#wallet-transfer-transfer-funds-input-from-bank_1').click({ force: true });
                        const randomValue = Math.floor(Math.random() * 555) + 1;
                       
                        cy.get('#wallet-transfer-transfer-funds-input-amount').clear().type(randomValue.toString());
                        cy.get('#wallet-transfer-transfer-funds-input-description').type('cypressautomation').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-button-complete').click({ force: true });
                        cy.get('button[type="button"]').contains('OK').click({ force: true });
                    });
                };
            

                const walletWithdrawTest = () => {
                    it('Wallet Withdraw', () => {
                         cy.loginB2C_US();
                         cy.wait(10000)
                        cy.get('#menu-item-wallets').click({ force: true });
                        cy.get('#menu-item-wallet-transfer').click({ force: true });
                        cy.get('#transfer_funds').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-operation-type').click({ force: true });
                        cy.get('li', { timeout: 10000 }).should('be.visible');
                        cy.get('#wallet-transfer-transfer-funds-input-operation-type_options').find('li').contains('Withdraw').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-to-wallet').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-to-wallet_32').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-from-bank').should('be.visible', { timeout: 4000 }).click({ force: true });
                      
                        cy.get('#wallet-transfer-transfer-funds-input-from-bank_1').click({ force: true });
                        const randomValue = Math.floor(Math.random() * 999) + 1;
                        cy.get('#wallet-transfer-transfer-funds-input-amount').clear().type(randomValue.toString());
                        cy.get('#wallet-transfer-transfer-funds-input-description').type('cypressautomation').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-button-complete').click({ force: true });
                        cy.get('button[type="button"]').contains('OK').click({ force: true });
                    });
                };
            
               const walletToWalletTransferTest = () => {
                    it('Wallet to Wallet Transfer', () => {
                         cy.loginB2C_US();
                         cy.wait(10000)
                        cy.get('#menu-item-wallets').click({ force: true });
                        cy.get('#menu-item-wallet-transfer').click({ force: true });
                        cy.get('#transfer_funds').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-operation-type').click({ force: true });
                        cy.get('li', { timeout: 10000 }).should('be.visible');
                        cy.get('#wallet-transfer-transfer-funds-input-operation-type_options').find('li').contains('Transfer').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-to-wallet').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-to-wallet_20').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-from-bank-merchant').should('be.visible', { timeout: 4000 }).click({ force: true });
            
                        cy.get('#wallet-transfer-transfer-funds-input-from-bank-merchant_1').click({ force: true });
                        const randomValue = Math.floor(Math.random() * 1999) + 1;
                        cy.get('#wallet-transfer-transfer-funds-input-amount').clear().type(randomValue.toString());
                        cy.get('#wallet-transfer-transfer-funds-input-description').type('cypressautomation').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-button-complete').click({ force: true });
                        cy.get('button[type="button"]').contains('OK').click({ force: true });
                    });
                };
            
                // Loop to run the tests twice
                for (let i = 0; i < 1; i++) {
                    walletDepositTest();
                   walletWithdrawTest();
                    walletToWalletTransferTest();
                }})
        
        }})








































































    