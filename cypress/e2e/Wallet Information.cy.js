import '@testing-library/cypress/add-commands';
import faker from 'faker';
import 'cypress-file-upload';



describe('walletcreation', () => {
  it('walletcreation', () => {
    cy.loginB2C_CA()
    cy.wait(5000)

    cy.get('#menu-item-wallets').click({ force: true })
    cy.get('#menu-item-wallet-setting').click({ force: true })

 cy.get('tr.e-masked-row').should('not.exist')
cy.get('td[role="gridcell"]').contains('amapsjdayd').click({force:true});
cy.get('#Edit_Wallet > .e-control > .e-tbar-btn-text').click({force:true})
cy.contains('.e-acrdn-header-content', 'Merchant Risk Profile').click({force:true});
cy.get('#merRiskProfile').click({ force: true })
cy.contains('li', 'High').click({force:true})
cy.contains('label', 'Primary Business Uses of Wallet')
  .invoke('attr', 'for')
  .then((id) => {
    cy.get(`#${id}`).type('Poojabusiness')
  })
cy.get('#SourceOfLiquidity').click({ force: true })
cy.get('li.e-list-item').contains('Joint Ventures').click({force:true})
cy.contains('button', 'Save').click({force:true})
// cy.contains('.e-acrdn-header-content', 'Contacts').click({ force: true })
// cy.contains('span.e-tbar-btn-text', 'Add').click()
// cy.get('#FirstName').type('Pooja')
// cy.get('#LastName').type('Pooja')
// cy.get('#Email').type('Pooja@test.com')
// cy.get('#ContactType').click({ force: true })

// cy.get('ul.e-list-parent')
//   .should('be.visible')
//   .contains('Technical')
//   .click({force:true})


// cy.get('#Phone').type('4389792908')
// cy.get('.e-footer-content > .e-primary').click({force:true})
// cy.wait(100)
// cy.contains('.e-acrdn-header-content', 'Bank Accounts').click({force:true})
// cy.contains('span.e-tbar-btn-text', 'Add')
//   .closest('button')
//   .click()
// cy.get('#mask')
//   .invoke('val', '002')
//   .trigger('input')
//   .trigger('change')


// cy.contains('label', 'Transit Number')
//   .parent()
//   .find('input[aria-label="maskedinput"]')
//   .invoke('val', '12345')
//   .trigger('input')
//   .trigger('change')

// cy.contains('label', 'Account Number')
//   .parent()
//   .find('input[aria-label="maskedinput"]')
//   .invoke('val', '1234567890')
//   .trigger('input')
//   .trigger('change')

// cy.get('#BusinessName').type('Test Business', { force: true })
// cy.get('#AccountOwnershipType').click({ force: true })
// cy.contains('li', 'BUSINESS').click({ force: true })

// cy.get('#AccountStatus').click({ force: true })
// cy.contains('li', 'Active').click({ force: true })




// cy.get('.e-footer-content > .e-primary').click({force:true})











  })
})