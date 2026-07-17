import '@testing-library/cypress/add-commands';
import faker from 'faker';
import 'cypress-file-upload';


describe('walletcreation', () => {
  
    it(' walletcreation', () => { // testcase 1
      //const randomFirstName = faker.name.firstName();
                  cy.loginB2C_CA();
cy.wait(5000)
  cy.get('#menu-item-wallets').click({force :true})
      cy.get('#menu-item-wallet-setting').click({force:true})
      cy.get('button[aria-label="New Wallet"]').click({force:true});
      cy.wait(2000)

    const randomName = faker.name.firstName()
console.log(randomName)

cy.get('input[id*="wallet-setting-new-wallet-input-merchant-id"]')
  .click({ force: true })
  .clear()
  .type(randomName, { force: true })
     

  const randomName1 = faker.name.firstName()
console.log(randomName)

cy.get('input[id*="wallet-setting-new-wallet-input-merchant-name"]')
  .click({ force: true })
  .clear()
  .type(randomName1, { force: true })
       

        // Click on the Wallet Status dropdown
// open Wallet Status dropdown
cy.get('input[id*="wallet-setting-new-wallet-input-status"]')
  .click({ force: true })

// select option from dropdown list
cy.contains('li', 'Active').click({ force: true })
cy.wait(2000)


 // cy.get('#wallet-setting-new-wallet-input-note').type('Not for testing purpose ').click({force:true})
// Click on the dropdown associated with Master Group

cy.get('input[id*="wallet-setting-new-wallet-input-merchant-master-group"]')
  .click({ force: true })

cy.get('.e-popup-open')
  .contains('li', 'Americo')   // replace with actual option
  .click({ force: true })

const methods = ['EFT', 'Interac']

methods.forEach((method) => {
  cy.get('input[id*="wallet-setting-new-wallet-input-transaction-methods"]')
    .should('be.visible')
    .click({ force: true })

  cy.get('li')
    .contains(method)
    .click({ force: true })
})

  
cy.get('input[id*="wallet-setting-new-wallet-input-merchant-trans-type"]')
  .click({ force: true })

cy.contains('li', 'COLLECT').click({ force: true })   // replace with your option

  
cy.get('input[id*="wallet-setting-new-wallet-input-merchant-legal-name"]').type('Kapcharge Merchant', { force: true })
cy.get('input[id*="wallet-setting-new-wallet-input-company-website"]').type('www.kapcharge.com')
cy.get('input[id*="wallet-setting-new-wallet-input-interact-notification-email"]').type('test@example.com');
cy.get('input[id*="wallet-setting-new-wallet-input-company-email"]').type('pooja@kapitalinc.com', { force: true })
cy.get('input[id*="wallet-setting-new-wallet-input-federal-tax-id"]').type('123456', { force: true })
cy.get('input[id*="wallet-setting-new-wallet-input-country"]')
  .click({ force: true })

cy.contains('li', 'CA').click({ force: true })
cy.get('input[id*="wallet-setting-new-wallet-input-province"]')
  .click({ force: true })

const province = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT']
const randomProvince = province[Math.floor(Math.random() * province.length)]

cy.get('[id*="wallet-setting-new-wallet-input-province_popup"]')
  .find('li')
  .contains(randomProvince)
  .click({ force: true })
cy.get('input[id*="wallet-setting-new-wallet-input-city"]')
  .type('Edmonton', { force: true })
  .click({ force: true })

cy.get('input[id*="wallet-setting-new-wallet-input-postal-code"]')
  .type('H3W1P9', { force: true })
  .click({ force: true })

cy.get('input[id*="wallet-setting-new-wallet-input-address1"]')
  .type('New Brunswick', { force: true })
  .click({ force: true })
cy.get('input[id*="wallet-setting-new-wallet-input-merchant-phone-type"]').click({ force: true })
cy.contains('li', 'HOME').click({ force: true })

// Phone input
cy.get('input[id*="wallet-setting-new-wallet-input-phone"]')
  .click({ force: true })
  .clear()
  .invoke('val', '(438)-979-2908')
  .trigger('input')
  .trigger('blur')

cy.get('input[id*="wallet-setting-new-wallet-input-phone"]')
  .should('have.value', '(438)-979-2908')


// Corporate Country dropdown
cy.get('input[id*="wallet-setting-new-wallet-input-corporate-country"]')
  .click({ force: true })

cy.contains('li', 'CA', { timeout: 5000 })
  .should('be.visible')
  .should('not.have.class', 'e-disabled')
  .click({ force: true })


// Corporate Province dropdown
const provinces = ['AB','BC','MB','NB','NL','NS','ON','PE','QC','SK','NT','NU','YT']
const randomProvince3 = Cypress._.sample(provinces)

cy.get('input[id*="wallet-setting-new-wallet-input-corporate-province"]')
  .click({ force: true })

cy.contains('li', randomProvince3).click({ force: true })


// Corporate City
cy.get('input[id*="wallet-setting-new-wallet-input-corporate-city"]')
  .type('Montreal', { force: true })


// Corporate Postal Code
cy.get('input[id*="wallet-setting-new-wallet-input-corporate-postal-code"]')
  .type('H3W1P9', { force: true })


cy.get('button.e-btn.e-primary')
  .contains('Save')
  .click();
  cy.wait(3000)
        
    })
  
  })
  