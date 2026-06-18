import '@testing-library/cypress/add-commands';
import faker from 'faker';
import 'cypress-file-upload';


describe('walletcreation', () => {
  
    it(' walletcreation', () => { // testcase 1
      //const randomFirstName = faker.name.firstName();
  cy.visit(Cypress.env('baseurl1'));
  cy.origin('https://kapitalincauthdevus.b2clogin.com', () => {
      cy.get('#email').type(Cypress.env('credentials').login_username);
      cy.get('input[id="password"]').type(Cypress.env('credentials').login_password);
      cy.get('#next').click();
      cy.wait(10000); 
  
  })
  cy.get('#menu-item-wallets').click({force :true})
      cy.get('#menu-item-wallet-setting').click({force:true})
      cy.get('button[aria-label="New Wallet"]').click({force:true});

      cy.get('#wallet-setting-new-wallet-input-merchant-id').click({force:true})
      const randomName = faker.name.firstName();
      console.log(randomName)
      //const randomName = `KPC- ${Math.random().toString(16).replace(/[^a-z]+/g, '').substring(0, )}`;
      cy.get('#wallet-setting-new-wallet-input-merchant-id')
        .click({ force: true })
        .type(randomName);

        cy.get('#wallet-setting-new-wallet-input-merchant-name').type('Cypress').click({force:true})

        // Click on the Wallet Status dropdown
cy.get('#WalletStatus').click({ force: true });
cy.get('li', { timeout: 10000 }).should('be.visible');
cy.get('li').contains('Deactivated')
  .should('be.visible') // Ensure it's visible before clicking
  .should('not.have.class', 'e-disabled') // Check it's not disabled
  .click({ force: true }); 

cy.wait(2000)


  cy.get('#wallet-setting-new-wallet-input-note').type('Not for testing purpose ').click({force:true})
// Click on the dropdown associated with Master Group
cy.get('#wallet-setting-new-wallet-input-master-group').click({force:true})
cy.get('li', { timeout: 10000 }).should('be.visible');

cy.get('li').contains('Kirk').should('be.visible') // Ensure it's visible before clicking
.should('not.have.class', 'e-disabled') // Check it's not disabled
  .click({ force: true }); 

cy.wait(2000)
cy.get('#wallet-setting-new-wallet-input-transaction-methods').click();
cy.get('li', { timeout: 10000 }).should('be.visible');
cy.get('li').contains('RCC').should('be.visible').should('not.have.class', 'e-disabled') // Check it's not disabled
  .click({ force: true }); 

cy.wait(1000)



  cy.get('#wallet-transaction-type').click({force:true})
  cy.get('li', { timeout: 10000 }).should('be.visible');
cy.get('li').contains('All').should('be.visible') // Ensure it's visible before clicking
  .should('not.have.class', 'e-disabled') // Check it's not disabled
  .click({ force: true });


cy.get('#wallet-setting-new-wallet-input-corporate-legal-name').type('Kapcharge').click({force:true})
cy.get('#wallet-setting-new-wallet-input-company-email').type('pooja@kapitalinc.com').click({force:true})
cy.get('#wallet-setting-new-wallet-input-federal-tax-id').type('123456').click({force:true})
cy.get('#wallet-setting-new-wallet-input-country').click({force:true})


cy.get('li', { timeout: 10000 }).should('be.visible');
cy.get('li').contains('US')
  .should('be.visible') // Ensure it's visible before clicking
  .should('not.have.class', 'e-disabled') // Check it's not disabled
  .click({ force: true });


cy.get('#wallet-setting-new-wallet-input-province').click({force:true});
const province = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
const randomProvince = province[Math.floor(Math.random() * province.length)];
cy.get('#wallet-setting-new-wallet-input-province_popup').find('li').contains(randomProvince).click();




cy.get('#wallet-setting-new-wallet-input-city').type('Edmonton').click()
cy.get('#wallet-setting-new-wallet-input-postal-code').type('95039').click()
cy.get('#wallet-setting-new-wallet-input-address1').type('News brunswick').click({force:true})


cy.get('#PhoneType').click({force:true})
cy.get('li', { timeout: 10000 }).should('be.visible');

cy.get('li').contains('HOME')
  .should('be.visible') // Ensure it's visible before clicking
  .should('not.have.class', 'e-disabled') // Check it's not disabled
  .click({ force: true });

  cy.get('#wallet-setting-new-wallet-input-phone').click({ force: true }).clear() // Clear the input if needed
    .invoke('val','(438)-979-2908') 
    .trigger('input') 
    .trigger('blur'); 
  cy.get('#wallet-setting-new-wallet-input-phone')
    .should('have.value', "(438)-979-2908", { timeout: 4000 }); 
  

cy.get('#wallet-setting-new-wallet-input-corporate-country').click({force:true})
cy.get('li', { timeout: 10000 }).should('be.visible');
cy.get('li').contains('US')
  .should('be.visible') // Ensure it's visible before clicking
  .should('not.have.class', 'e-disabled') // Check it's not disabled
  .click({ force: true });





cy.get('#wallet-setting-new-wallet-input-corporate-province').click({force:true});
const provincee = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
const randomProvincee = provincee[Math.floor(Math.random() * provincee.length)];
cy.get('#wallet-setting-new-wallet-input-corporate-province_popup').find('li').contains(randomProvincee).click();

cy.get('#wallet-setting-new-wallet-input-corporate-city').type('montreal').click({force:true})
cy.get('#wallet-setting-new-wallet-input-corporate-postal-code').type('95039').click({force:true})


cy.get('#wallet-setting-new-wallet-button-save').click({force:true})

        
    })


    
})
  
  
  