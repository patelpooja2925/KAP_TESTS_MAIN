import '@testing-library/cypress/add-commands';
import faker from 'faker';
import 'cypress-file-upload';

describe('Create New Transaction', () => {
    const numTransactions = 1; // Change this to the number of transactions you want to create
   const transactionScenarios = [
        { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').eft },
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').eft },
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').interac },
        { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').interac }
    ];

    const businessTransactionScenarios = [
        { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').eft },
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').eft },
        { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').interac },
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').interac }
    ];
    const ScduledTransactionScenarios = [
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').eft },
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').interac },
    ];

    const ExistingtransactionScenarios = [
        { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').eft },
       { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').eft },
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').interac },
        { type: Cypress.env('transaction_type').type_pay, method: Cypress.env('transaction_methods').interac }
    ];
    const DelayTransactionScenarios = [
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').eft },
        { type: Cypress.env('transaction_type').type_collect, method: Cypress.env('transaction_methods').interac },
    ];
    const today = new Date().toLocaleDateString('en-US');
    for (let i = 0; i < numTransactions; i++) {
     transactionScenarios.forEach((scenario) => {
            it(`Add a new customer transaction - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
                const randomFirstName = faker.name.firstName();
                const randomLastName = faker.name.lastName();
             
                const randomEmail = faker.internet.email();
                const randomPhoneNumber = faker.phone.phoneNumber('###-###-####');
                const randomZipCode = faker.address.zipCode('?#?-#?#');

                cy.loginB2C_CA();
cy.wait(20000)
                cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                cy.wait(5000)
                    cy.contains('.nav-link .displayText', 'Transactions').click({ force: true });
                //cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({force:true});
                cy.wait(5000);
                cy.contains('button', 'New Transaction').click({ force: true });

                //cy.get('#Grid_add2').click({force:true});
                cy.wait(3000);
                cy.get('#drpMerchant').click({force:true});
                cy.get('#drpMerchant_popup').find('li').contains('KPC_201-Pooja').click();
                //cy.wait(5000);

                cy.get('#drpTransType').click({force:true});
                cy.get('#drpTransType_popup').find('li').contains(scenario.type).click();

                cy.get('#drpTransMethod').click({ force: true });
                cy.get('#drpTransMethod_popup').find('li').contains(scenario.method).click();

                cy.get('#txtAmount').clear().type('1.01');
                cy.get('#txtMerchantRefNumber').type('123456');
                cy.get('#txtDescriptions').clear().type('This is a cypress test automation');
                cy.get('#add-transaction-button-add-customer').click({force:true});

                // Additional fields for INTERAC method
                if (scenario.type === Cypress.env('transaction_type').type_pay && scenario.method === Cypress.env('transaction_methods').interac) {
                    cy.get('#txtQuestion').type('What is your favorite color?');
                    cy.get('#txtAnswer').type('Yellow');
                    cy.wait(3000);
                }

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
                cy.get('#drpState').click({force:true});
                const province = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];
                const randomProvince = province[Math.floor(Math.random() * province.length)];
                cy.get('#drpState_popup').find('li').contains(randomProvince).click();

                cy.get('#txtCity').type('Montreal');
                cy.get('#txtZip').click({force:true});
                cy.get('#txtZip').invoke('val', randomZipCode).trigger('input').trigger('blur');
                cy.get('#txtZip').should('have.value', randomZipCode, { timeout: 10000 });
                cy.get('#drpInstitutionNumber').click({force:true});
                cy.get('#drpInstitutionNumber').type('002');
                cy.get('#drpInstitutionNumber_popup').find('li').contains('002').click();
                cy.get('#txtTransitNumber').type('11111');
                cy.get('#txtAccountNumber').type('2343241');
               cy.get('#add-transaction-schedule-transaction-info-button-save > span').click({force:true});
                cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible', { timeout: 4000 }).click({force:true});
                cy.wait(1000)
            cy.contains('button', 'OK').click({force:true});
                cy.wait(1000)
            });
        
        })
        businessTransactionScenarios.forEach((scenario) => {
            it(`Add a new business customer transaction - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
                const randomFirstName = faker.name.firstName();
                const randomLastName = faker.name.lastName();
                const randomEmail = faker.internet.email();
                const randomPhoneNumber = faker.phone.phoneNumber('###-###-####');
                const randomZipCode = faker.address.zipCode('?#?-#?#');

                cy.loginB2C_CA();

                cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                cy.wait(3000)
                cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({force:true});
                cy.wait(3000);
                cy.get('#Grid_add2').click({force:true});
                cy.wait(2000);
                cy.get('#drpMerchant').click({force:true});
                cy.get('#drpMerchant_popup').find('li').contains('KPC_201-Pooja').click();
                cy.wait(1000);

                cy.get('#drpTransType').click({ force: true });
                cy.get('#drpTransType_popup').find('li').contains(scenario.type).click();

                cy.get('#drpTransMethod').click({force:true});
                cy.get('#drpTransMethod_popup').find('li').contains(scenario.method).click();

                cy.get('#txtAmount').clear().type('1.00');
                cy.get('#txtMerchantRefNumber').clear().type('123456');
                cy.get('#txtDescriptions').clear().type('This is a cypress test automation');
                cy.get('#add-transaction-button-add-customer').click();
                if (scenario.type === Cypress.env('transaction_type').type_pay && scenario.method === Cypress.env('transaction_methods').interac) {
                    cy.get('#txtQuestion').type('What is your favorite color?');
                    cy.get('#txtAnswer').type('Yellow');
                    cy.wait(2000);
                }

                cy.contains('Business Customer').parent().within(() => {
                    cy.get('[type="checkbox"]').then($business => {
                        if ($business.is(':not(:checked)')) {
                            cy.wrap($business).check({ force: true });
                        }
                    }).should('be.checked');
                });
                const businessName = `${randomLastName} ${randomFirstName}`;
                cy.get('#txtBusinessName').type(businessName);
                cy.get('#txtEmail').type(randomEmail);
                cy.get('#txtPhone').click({ force: true });
                cy.get('#txtPhone')
                    .invoke('val', randomPhoneNumber)
                    .trigger('input')
                    .trigger('blur');
                cy.get('#txtPhone')
                    .should('have.value', randomPhoneNumber, { timeout: 1000 });
                cy.get('#txtAddress1').type('423 street');
                cy.get('#txtAddress2').type('Unit 7');
                cy.get('#drpState').click({force:true});
                const province = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];
                const randomProvince = province[Math.floor(Math.random() * province.length)];
                cy.get('#drpState_popup').find('li').contains(randomProvince).click();

                cy.get('#txtCity').type('Montreal');
                cy.get('#txtZip').click();
                cy.get('#txtZip').invoke('val', randomZipCode).trigger('input').trigger('blur');
                cy.get('#txtZip').should('have.value', randomZipCode, { timeout: 10000 });
                cy.get('#drpInstitutionNumber').click();
                cy.get('#drpInstitutionNumber').type('002');
              //  cy.get('#drpInstitutionNumber_popup').find('li').contains('002').click();
                cy.get('#txtTransitNumber').type('11111');
                cy.get('#txtAccountNumber').type('2343241');
              cy.get('#add-transaction-schedule-transaction-info-button-save > span').click({force:true});
                //cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible', { timeout: 4000 }).click();
                cy.wait(5000)
                 cy.contains('button', 'OK').click({force:true});

                cy.wait(5000)
            });
        })
                ScduledTransactionScenarios.forEach((scenario) => {
                    it(`Add a new   Daily schedule customer transaction - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
                        const randomFirstName = faker.name.firstName();
                        const randomLastName = faker.name.lastName();
                        const randomEmail = faker.internet.email();
                        const randomPhoneNumber = faker.phone.phoneNumber('###-###-####');
                        const randomZipCode = faker.address.zipCode('?#?-#?#');
        
                        cy.loginB2C_CA();
        
                        cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                        cy.wait(5000)
                        cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({ force: true });
                        cy.wait(5000);
                        cy.get('#Grid_add2').click({force:true});
                        cy.wait(2000);
                        cy.get('#drpMerchant').click({force:true});
                        cy.get('#drpMerchant_popup').find('li').contains('KPC_201-Pooja').click();
                        cy.wait(1000);
        
                        cy.get('#drpTransType').click({force:true});
                        cy.get('#drpTransType_popup').find('li').contains(scenario.type).click();
        
                        cy.get('#drpTransMethod').click({force:true});
                        cy.get('#drpTransMethod_popup').find('li').contains(scenario.method).click();
        
                        cy.get('#txtAmount').clear().type('0.01');
                        cy.get('#txtMerchantRefNumber').clear().type('123456');
                        cy.get('#txtDescriptions').clear().type('This is a cypress test automation');
                        cy.get('#add-transaction-button-add-customer').click();
        
            
        
                        cy.get('#txtFirstName').type(randomFirstName);
                        cy.get('#txtLastName').type(randomLastName);
                        cy.get('#txtEmail').type(randomEmail);
                        cy.get('#txtPhone').click({ force: true });
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
                        const province = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];
                        const randomProvince = province[Math.floor(Math.random() * province.length)];
                        cy.get('#drpState_popup').find('li').contains(randomProvince).click();
        
                        cy.get('#txtCity').type('Montreal');
                        cy.get('#txtZip').click({ force: true });
                        cy.get('#txtZip').invoke('val', randomZipCode).trigger('input').trigger('blur');
                        cy.get('#txtZip').should('have.value', randomZipCode, { timeout: 10000 });
                        cy.get('#drpInstitutionNumber').click({ force: true });
                        cy.get('#drpInstitutionNumber').type('002');
                        cy.get('#drpInstitutionNumber_popup').find('li').contains('002').click();
                        cy.get('#txtTransitNumber').type('11111');
                        cy.get('#txtAccountNumber').type('2343241');
        
                        
                    cy.contains('Delay Transaction').parent().within(() => {
                        cy.get('[type="checkbox"]').then($delay => {
                            if ($delay.is(':checked')) {
                            cy.wrap($delay).check({ force: true });
                        }
                        }).should('not.be.checked');
                    
                });
                cy.contains('Schedule Transactions').parent().within(() => {
                    cy.get('[type="checkbox"]').then($delay => {
                        if ($delay.is(':not(:checked')) {
                        cy.wrap($delay).check({ force: true });
                    }
                    }).should('be.checked');
                
            })
            cy.get('#add-transaction-schedule-transaction-info-input-recurrence-type').click({force:true}) 
            cy.get('li', { timeout: 10000 }).should('be.visible') 
            cy.get('li').contains('Daily').click()  
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = today.getFullYear();
            const startDate =`${mm}/${dd}/${yyyy}`;
            
            const endDateObj = new Date(today);
            endDateObj.setDate(today.getDate() + 2);
            const endDd = String(endDateObj.getDate()).padStart(2, '0');
            const endMm = String(endDateObj.getMonth() + 1).padStart(2, '0');
            const endYyyy = endDateObj.getFullYear()
            const endDate = `${endMm}/${endDd}/${endYyyy}`;
            
            cy.get('#add-transaction-schedule-transaction-info-input-start-date').click({force:true})
            .clear()
            .type(startDate) // Replace with the desired date format if needed
            .trigger('blur');
            
                    cy.get('#add-transaction-schedule-transaction-info-input-end-date')
                .clear()
                .type(endDate) // Replace with the desired date format if needed
                .trigger('blur');
            
        
            
                        cy.get('#add-transaction-schedule-transaction-info-button-save > span').click({ force: true });
                        cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.wait(1000)
                         cy.contains('button', 'OK').click({force:true});
                        cy.wait(1000)
                    })
                
        
                    it(`Add a new  Schedule Weekly customer transaction - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
                        const randomFirstName = faker.name.firstName();
                        const randomLastName = faker.name.lastName();
                        const randomEmail = faker.internet.email();
                        const randomPhoneNumber = faker.phone.phoneNumber('###-###-####');
                        const randomZipCode = faker.address.zipCode('?#?-#?#');
        
                        cy.loginB2C_CA();
        
                        cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                        cy.wait(5000)
                        cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({ force: true });
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
        
                        cy.get('#txtAmount').clear().type('0.01');
                        cy.get('#txtMerchantRefNumber').clear().type('123456');
                        cy.get('#txtDescriptions').clear().type('This is a cypress test automation');
                        cy.get('#add-transaction-button-add-customer').click({ force: true });
        
            
        
                        cy.get('#txtFirstName').type(randomFirstName);
                        cy.get('#txtLastName').type(randomLastName);
                        cy.get('#txtEmail').type(randomEmail);
                        cy.get('#txtPhone').click({ force: true });
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
                        const province = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];
                        const randomProvince = province[Math.floor(Math.random() * province.length)];
                        cy.get('#drpState_popup').find('li').contains(randomProvince).click();
        
                        cy.get('#txtCity').type('Montreal');
                        cy.get('#txtZip').click({ force: true });
                        cy.get('#txtZip').invoke('val', randomZipCode).trigger('input').trigger('blur');
                        cy.get('#txtZip').should('have.value', randomZipCode, { timeout: 10000 });
                        cy.get('#drpInstitutionNumber').click({ force: true });
                        cy.get('#drpInstitutionNumber').type('002');
                        cy.get('#drpInstitutionNumber_popup').find('li').contains('002').click();
                        cy.get('#txtTransitNumber').type('11111');
                        cy.get('#txtAccountNumber').type('2343241');
        
                        
                    cy.contains('Delay Transaction').parent().within(() => {
                        cy.get('[type="checkbox"]').then($delay => {
                            if ($delay.is(':checked')) {
                            cy.wrap($delay).check({ force: true });
                        }
                        }).should('not.be.checked');
                    
                });
                cy.contains('Schedule Transactions').parent().within(() => {
                    cy.get('[type="checkbox"]').then($delay => {
                        if ($delay.is(':not(:checked')) {
                        cy.wrap($delay).check({ force: true });
                    }
                    }).should('be.checked');
                
            })
            cy.get('#add-transaction-schedule-transaction-info-input-recurrence-type').click({force:true}) 
            cy.get('li', { timeout: 10000 }).should('be.visible') 
            cy.get('li').contains('Weekly').click()  
            const Weekday= ['Monday','Tuesday','Wednesday','Thursday','Friday']
            const today = new Date();
            const currentDay = Weekday[today.getDay()-1]
            cy.get('#add-transaction-schedule-transaction-info-input-weekday').click({force:true})
        
        cy.get('li', { timeout: 10000 }).should('be.visible') 
        cy.get('li').contains(currentDay).click() 
        
        
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = today.getFullYear();
            const startDate =`${mm}/${dd}/${yyyy}`;
            
            const endDateObj = new Date(today);
            endDateObj.setDate(today.getDate() + 2);
            const endDd = String(endDateObj.getDate()).padStart(2, '0');
            const endMm = String(endDateObj.getMonth() + 1).padStart(2, '0');
            const endYyyy = endDateObj.getFullYear()
            const endDate = `${endMm}/${endDd}/${endYyyy}`;
            
            cy.get('#add-transaction-schedule-transaction-info-input-start-date').click({force:true})
            .clear()
            .type(startDate) // Replace with the desired date format if needed
            .trigger('blur');
            
                    cy.get('#add-transaction-schedule-transaction-info-input-end-date')
                .clear()
                .type(endDate) // Replace with the desired date format if needed
                .trigger('blur');
            
        
            
                       cy.get('#add-transaction-schedule-transaction-info-button-save > span').click({ force: true });
                        cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.wait(1000)
                      cy.contains('button', 'OK').click({force:true});
                        cy.wait(1000)
                    });
        
                    it(`Add a new  Schedule BiWeekly customer transaction - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
                        const randomFirstName = faker.name.firstName();
                        const randomLastName = faker.name.lastName();
                        const randomEmail = faker.internet.email();
                        const randomPhoneNumber = faker.phone.phoneNumber('###-###-####');
                        const randomZipCode = faker.address.zipCode('?#?-#?#');
        
                        cy.loginB2C_CA();
        
                        cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                        cy.wait(2000)
                        cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({force:true});
                        cy.wait(1000);
                        cy.get('#Grid_add2').click({ force: true });
                        cy.wait(2000);
                        cy.get('#drpMerchant').click({ force: true });
                        cy.get('#drpMerchant_popup').find('li').contains('KPC_201-Pooja').click();
                        cy.wait(1000);
        
                        cy.get('#drpTransType').click({ force: true });
                        cy.get('#drpTransType_popup').find('li').contains(scenario.type).click();
        
                        cy.get('#drpTransMethod').click({ force: true });
                        cy.get('#drpTransMethod_popup').find('li').contains(scenario.method).click();
        
                        cy.get('#txtAmount').clear().type('0.01');
                        cy.get('#txtMerchantRefNumber').clear().type('123456');
                        cy.get('#txtDescriptions').clear().type('This is a cypress test automation');
                        cy.get('#add-transaction-button-add-customer').click({ force: true });
            cy.get('#txtFirstName').type(randomFirstName);
                        cy.get('#txtLastName').type(randomLastName);
                        cy.get('#txtEmail').type(randomEmail);
                        cy.get('#txtPhone').click({ force: true });
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
                        const province = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];
                        const randomProvince = province[Math.floor(Math.random() * province.length)];
                        cy.get('#drpState_popup').find('li').contains(randomProvince).click();
        
                        cy.get('#txtCity').type('Montreal');
                        cy.get('#txtZip').click({ force: true });
                        cy.get('#txtZip').invoke('val', randomZipCode).trigger('input').trigger('blur');
                        cy.get('#txtZip').should('have.value', randomZipCode, { timeout: 10000 });
                        cy.get('#drpInstitutionNumber').click({ force: true });
                        cy.get('#drpInstitutionNumber').type('002');
                        cy.get('#drpInstitutionNumber_popup').find('li').contains('002').click();
                        cy.get('#txtTransitNumber').type('11111');
                        cy.get('#txtAccountNumber').type('2343241');
        
                        
                    cy.contains('Delay Transaction').parent().within(() => {
                        cy.get('[type="checkbox"]').then($delay => {
                            if ($delay.is(':checked')) {
                            cy.wrap($delay).check({ force: true });
                        }
                        }).should('not.be.checked');
                    
                });
                cy.contains('Schedule Transactions').parent().within(() => {
                    cy.get('[type="checkbox"]').then($delay => {
                        if ($delay.is(':not(:checked')) {
                        cy.wrap($delay).check({ force: true });
                    }
                    }).should('be.checked');
                
            })
            cy.get('#add-transaction-schedule-transaction-info-input-recurrence-type').click({force:true}) 
            cy.get('li', { timeout: 10000 }).should('be.visible') 
            cy.get('li').contains('Biweekly').click()  
            const Weekday= ['Monday','Tuesday','Wednesday','Thursday','Friday']
            const today = new Date();
            const currentDay = Weekday[today.getDay()-1]
            cy.get('#add-transaction-schedule-transaction-info-input-weekday').click({force:true})
            cy.get('li', { timeout: 10000 }).should('be.visible') 
            cy.get('li').contains(currentDay).click() 
        
        
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = today.getFullYear();
            const startDate =`${mm}/${dd}/${yyyy}`;
            
            const endDateObj = new Date(today);
            endDateObj.setDate(today.getDate() + 2);
            const endDd = String(endDateObj.getDate()).padStart(2, '0');
            const endMm = String(endDateObj.getMonth() + 1).padStart(2, '0');
            const endYyyy = endDateObj.getFullYear()
            const endDate = `${endMm}/${endDd}/${endYyyy}`;
            
            cy.get('#add-transaction-schedule-transaction-info-input-start-date').click({force:true})
            .clear()
            .type(startDate) // Replace with the desired date format if needed
            .trigger('blur');
            
                    cy.get('#add-transaction-schedule-transaction-info-input-end-date')
                .clear()
                .type(endDate) // Replace with the desired date format if needed
                .trigger('blur');
            
                        cy.get('#add-transaction-schedule-transaction-info-button-save > span').click({ force: true });
                        cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.wait(1000)
                          cy.contains('button', 'OK').click({force:true});
                        cy.wait(1000)
                    });
                
                    it(`Add a new  Schedule Monthly customer transaction - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
                        const randomFirstName = faker.name.firstName();
                        const randomLastName = faker.name.lastName();
                        const randomEmail = faker.internet.email();
                        const randomPhoneNumber = faker.phone.phoneNumber('###-###-####');
                        const randomZipCode = faker.address.zipCode('?#?-#?#');
        
                        cy.loginB2C_CA();
        
                        cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                        cy.wait(2000)
                        cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({force:true});
                        cy.wait(1000);
                        cy.get('#Grid_add2').click({ force: true });
                        cy.wait(2000);
                        cy.get('#drpMerchant').click({ force: true });
                        cy.get('#drpMerchant_popup').find('li').contains('KPC_201-Pooja').click();
                        cy.wait(1000);
        
                        cy.get('#drpTransType').click({ force: true });
                        cy.get('#drpTransType_popup').find('li').contains(scenario.type).click();
        
                        cy.get('#drpTransMethod').click({ force: true });
                        cy.get('#drpTransMethod_popup').find('li').contains(scenario.method).click();
        
                        cy.get('#txtAmount').clear().type('0.01');
                        cy.get('#txtMerchantRefNumber').clear().type('123456')
                        cy.get('#txtDescriptions').clear().type('This is a cypress test automation');
                        cy.get('#add-transaction-button-add-customer').click({ force: true });
        
            
        
                        cy.get('#txtFirstName').type(randomFirstName);
                        cy.get('#txtLastName').type(randomLastName);
                        cy.wait(2000)
                        cy.get('#txtEmail').type(randomEmail);
                        cy.get('#txtPhone').click({ force: true });
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
                        const province = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];
                        const randomProvince = province[Math.floor(Math.random() * province.length)];
                        cy.get('#drpState_popup').find('li').contains(randomProvince).click();
        
                        cy.get('#txtCity').type('Montreal');
                        cy.get('#txtZip').click({ force: true });
                        cy.get('#txtZip').invoke('val', randomZipCode).trigger('input').trigger('blur');
                        cy.get('#txtZip').should('have.value', randomZipCode, { timeout: 10000 });
                        cy.get('#drpInstitutionNumber').click();
                        cy.get('#drpInstitutionNumber').type('002');
                        cy.get('#drpInstitutionNumber_popup').find('li').contains('002').click();
                        cy.get('#txtTransitNumber').type('11111');
                        cy.get('#txtAccountNumber').type('2343241');
        
                        
                    cy.contains('Delay Transaction').parent().within(() => {
                        cy.get('[type="checkbox"]').then($delay => {
                            if ($delay.is(':checked')) {
                            cy.wrap($delay).check({ force: true });
                        }
                        }).should('not.be.checked');
                    
                });
                cy.contains('Schedule Transactions').parent().within(() => {
                    cy.get('[type="checkbox"]').then($delay => {
                        if ($delay.is(':not(:checked')) {
                        cy.wrap($delay).check({ force: true });
                    }
                    }).should('be.checked');
                
            })
            cy.get('#add-transaction-schedule-transaction-info-input-recurrence-type').click({force:true}) 
            cy.get('li', { timeout: 10000 }).should('be.visible') 
            cy.get('li').contains('Monthly').click()  
          
            const today = new Date();
            const currentDate = today.getDate()
            cy.get('#add-transaction-schedule-transaction-info-input-day-of-the-month').click({force:true})
        
        .clear().type(currentDate.toString()).click() 
        
        
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = today.getFullYear();
            const startDate =`${mm}/${dd}/${yyyy}`;
            
            const endDateObj = new Date(today);
            endDateObj.setDate(today.getDate() + 2);
            const endDd = String(endDateObj.getDate()).padStart(2, '0');
            const endMm = String(endDateObj.getMonth() + 1).padStart(2, '0');
            const endYyyy = endDateObj.getFullYear()
            const endDate = `${endMm}/${endDd}/${endYyyy}`;
            
            cy.get('#add-transaction-schedule-transaction-info-input-start-date').click({force:true})
            .clear()
            .type(startDate) // Replace with the desired date format if needed
            .trigger('blur');
            
                    cy.get('#add-transaction-schedule-transaction-info-input-end-date')
                .clear()
                .type(endDate) // Replace with the desired date format if needed
                .trigger('blur');
        
            
                      cy.get('#add-transaction-schedule-transaction-info-button-save > span').click({ force: true });
                        cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.wait(1000)
                    cy.contains('button', 'OK').click({force:true});
                        cy.wait(5000)
                    })})
                    
                        ExistingtransactionScenarios.forEach((scenario) => {
                            it(`Search customer transaction For - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
                    cy.loginB2C_CA();
            
                            cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                            cy.wait(2000)
                            cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({force:true});
                            cy.wait(3000);
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
                            
                           cy.get('#fltCustomerInfo').click({ force: true })
  .clear() // optional, to ensure field is empty
  .type('searchuser@gmail.com').should('be.visible').click({ force: true });


// Now try finding the cell
cy.contains('td', 'searchuser@gmail.com', { timeout: 10000 }) .should('be.visible').click({ force: true });


cy.wait(4000); 
                     cy.get('#add-transaction-schedule-transaction-info-button-save > span').click({ force: true });
                    
                            cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible', { timeout: 4000 }).click({ force: true });
                            cy.wait(1000)
                          
                         cy.contains('button', 'OK').click({force:true});
                            cy.wait(1000)
                })
            })
            it('Edit Schedules Transactions ', () => {
                cy.loginB2C_CA();
        
                cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                cy.get('#menu-item-schedules').click({ force: true });
        
          
                cy.get('button[id^="schedules-action-"]').first().click();
        
                cy.contains('li.e-item', 'Edit Amount').click();
        
        cy.get('#txtAmount').clear().type('0.04').click({force:true})
        cy.get('#dialog-amount-button-ok').click({force:true})
        cy.wait(1000)
        //cy.get('#dialog-amount-button-cancel').click({force:true})
        //cy.get('#schedules-cancel-dialog-button-ok').click({force:true})
                
            })
        
         
                it('Cancel Schedules Transactions ', () => {
                    cy.loginB2C_CA();
            
                    cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                    cy.get('#menu-item-schedules').click({ force: true });
            
                    // Step 1: Click the button
            cy.get('button[id^="schedules-action-"]').first().click();
            
            // Step 2: Click the "Cancel All" option
            cy.get('li[id^="schedules-cancel-all-"]').click();
            cy.wait(1000)
            
            cy.get('#schedules-cancel-dialog-button-ok').click({force:true})
                    
                })

                DelayTransactionScenarios.forEach((scenario) => {
   

                    it(`Create a Delay transaction - ${scenario.type} Transaction - ${scenario.method.toUpperCase()}`, () => {
                        const randomFirstName = faker.name.firstName();
                        const randomLastName = faker.name.lastName();
                     
                        const randomEmail = faker.internet.email();
                        const randomPhoneNumber = faker.phone.phoneNumber('###-###-####');
                        const randomZipCode = faker.address.zipCode('?#?-#?#');
            
                        cy.visit(Cypress.env('baseurl'));
            
                        cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
                            cy.get('#email').type(Cypress.env('credentials').login_username);
                            cy.get('input[id="password"]').type(Cypress.env('credentials').login_password);
                            cy.get('#next').click();
                            cy.wait(10000);
                        });
            
                        cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click();
                        cy.wait(3000)
                        cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({ force: true });
                        cy.wait(3000);
                        cy.get('#Grid_add2').click({ force: true });
                        cy.wait(3000);
                        cy.get('#drpMerchant').click({ force: true });
                        cy.get('#drpMerchant_popup').find('li').contains('KPC_201-Pooja').click();
                        cy.wait(2000);
            
                        cy.get('#drpTransType').click({ force: true });
                        cy.get('#drpTransType_popup').find('li').contains(scenario.type).click();
            
                        cy.get('#drpTransMethod').click({ force: true });
                        cy.get('#drpTransMethod_popup').find('li').contains(scenario.method).click();
            
                        cy.get('#txtAmount').clear().type('0.01');
                        cy.get('#txtMerchantRefNumber').clear().type('123456');
                        cy.get('#txtDescriptions').clear().type('This is a cypress test automation');
                        cy.get('#add-transaction-button-add-customer').click({ force: true });
            
                        // Additional fields for INTERAC method
                        if (scenario.type === Cypress.env('transaction_type').type_pay && scenario.method === Cypress.env('transaction_methods').interac) {
                            cy.get('#txtQuestion').type('What is your favorite color?');
                            cy.get('#txtAnswer').type('Yellow');
                            cy.wait(3000);
                        }
            
                        cy.get('#txtFirstName').type(randomFirstName);
                        cy.get('#txtLastName').type(randomLastName);
                        cy.get('#txtEmail').type(randomEmail);
                        cy.get('#txtPhone').click({ force: true });
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
                        const province = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];
                        const randomProvince = province[Math.floor(Math.random() * province.length)];
                        cy.get('#drpState_popup').find('li').contains(randomProvince).click();
            
                        cy.get('#txtCity').type('Montreal');
                        cy.get('#txtZip').click({ force: true });
                        cy.get('#txtZip').invoke('val', randomZipCode).trigger('input').trigger('blur');
                        cy.get('#txtZip').should('have.value', randomZipCode, { timeout: 10000 });
                        cy.get('#drpInstitutionNumber').click({ force: true });
                        cy.get('#drpInstitutionNumber').type('002');
                        cy.get('#drpInstitutionNumber_popup').find('li').contains('002').click();
                        cy.get('#txtTransitNumber').type('11111');
                        cy.get('#txtAccountNumber').type('2343241');
                       cy.get('#add-transaction-schedule-transaction-info-button-save > span').click({ force: true });
                        cy.get('#add-transaction-schedule-transaction-info-dialog-button-ok').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.wait(1000)
                  cy.contains('button', 'OK').click({force:true});
                        cy.wait(1000)
                    });
              })
             describe('Upload Batch File', () => {
  
    
                it('Add a batch file', () => {
                    
                    cy.visit(Cypress.env('baseurl'));
            
                    cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
                        cy.get('#email').type(Cypress.env('credentials').login_username);
                        cy.get('input[id="password"]').type(Cypress.env('credentials').login_password);
                        cy.get('#next').click();
                        cy.wait(10000);
                    });
                        cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click()
                        cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({force:true})
                        cy.wait(2000)
                        cy.get('#menu-item-transactions').contains(Cypress.env('menu_items').item_transactions).click()
                        cy.get('#menu-item-transaction-management').contains(Cypress.env('menu_item_transactions').item_transaction_management).click({force:true})
                        cy.get('#Grid_batch').click({ force: true });
                        cy.wait(3000);
                        cy.get('#merchantDropdown').click({force:true})
                        cy.get('#merchantDropdown_popup').find('li').contains('KPC_201-Pooja').click();
                        cy.get('#fileInput').click({force:true})
                        cy.get('#fileInput').attachFile('Pooja.xlsx');
                        cy.get('#batch-upload-button-validate').click({force:true})
                        cy.wait(5000)
                        cy.get('#batch-upload-button-upload').click({force:true})
            
                    })
            })

              describe('Create wallet transactions', () => {
                // Define the tests as functions
               const walletDepositTest = () => {
                    it('Wallet Deposit', () => {
                        cy.loginB2C_CA();
                        cy.get('#menu-item-wallets').click({ force: true });
                        cy.get('#menu-item-wallet-transfer').click({ force: true });
                        cy.get('#transfer_funds').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-operation-type').click({ force: true });
                        cy.get('li', { timeout: 10000 }).should('be.visible');
                        cy.get('#wallet-transfer-transfer-funds-input-to-wallet').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-to-wallet_34').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-from-bank').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-from-bank_0', { timeout: 10000 }).should('exist').click({ force: true });
                         //cy.get('#wallet-transfer-transfer-funds-input-from-bank_1').click({ force: true });
                        const randomValue = Math.floor(Math.random() * 555) + 1;
                       
                        cy.get('#wallet-transfer-transfer-funds-input-amount').clear().type(randomValue.toString());
                        cy.get('#wallet-transfer-transfer-funds-input-description').type('cypressautomation').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-button-complete').click({ force: true });
                        cy.get('button[type="button"]').contains('OK').click({ force: true });
                    });
                };
            
                const walletWithdrawTest = () => {
                    it('Wallet Withdraw', () => {
                        cy.loginB2C_CA();
                        cy.get('#menu-item-wallets').click({ force: true });
                        cy.get('#menu-item-wallet-transfer').click({ force: true });
                        cy.get('#transfer_funds').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-operation-type').click({ force: true });
                        cy.get('li', { timeout: 10000 }).should('be.visible');
                        cy.get('#wallet-transfer-transfer-funds-input-operation-type_options').find('li').contains('Withdraw').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-to-wallet').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-to-wallet_34').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-from-bank').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-from-bank_0', { timeout: 10000 }).should('exist').click({ force: true });
                        //cy.get('#wallet-transfer-transfer-funds-input-from-bank_1').click({ force: true });
                        const randomValue = Math.floor(Math.random() * 999) + 1;
                        cy.get('#wallet-transfer-transfer-funds-input-amount').clear().type(randomValue.toString());
                        cy.get('#wallet-transfer-transfer-funds-input-description').type('cypressautomation').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-button-complete').click({ force: true });
                        cy.get('button[type="button"]').contains('OK').click({ force: true });
                    });
                
                }
               const walletToWalletTransferTest = () => {
                    it('Wallet to Wallet Transfer', () => {
                        cy.loginB2C_CA();
                        cy.get('#menu-item-wallets').click({ force: true });
                        cy.get('#menu-item-wallet-transfer').click({ force: true });
                        cy.get('#transfer_funds').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-operation-type').click({ force: true });
                        cy.get('li', { timeout: 10000 }).should('be.visible');
                        cy.get('#wallet-transfer-transfer-funds-input-operation-type_options').find('li').contains('Transfer').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-to-wallet').should('be.visible', { timeout: 4000 }).click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-to-wallet_34').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-input-from-bank-merchant').should('be.visible', { timeout: 4000 }).click({ force: true });
            
                        cy.get('#wallet-transfer-transfer-funds-input-from-bank-merchant_14').click({ force: true });
                        const randomValue = Math.floor(Math.random() * 1999) + 1;
                        cy.get('#wallet-transfer-transfer-funds-input-amount').clear().type(randomValue.toString());
                        cy.get('#wallet-transfer-transfer-funds-input-description').type('cypressautomation').click({ force: true });
                        cy.get('#wallet-transfer-transfer-funds-button-complete').click({ force: true });
                        cy.get('button[type="button"]').contains('OK').click({ force: true });
                    });
                };
                const CancelTest = () => {
        it('Wallet Cancel', () => {
            cy.loginB2C_CA();
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
                   walletWithdrawTest();
                    walletToWalletTransferTest();
                    CancelTest();
}})}})
    