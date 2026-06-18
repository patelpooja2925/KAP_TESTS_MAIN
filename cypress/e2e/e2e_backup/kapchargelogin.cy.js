describe('SuperAdmin Login', () => {
  
  it(' Successfull login', () => { // testcase 1
    
cy.visit(Cypress.env('baseurl'))
   
    cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
    cy.get('#email').type(Cypress.env('credentials').login_username)
    cy.get('input[id="password"]').type(Cypress.env('credentials').login_password) ///provide correct password when running script
    cy.get('#next').click()
    cy.wait(12000)

})
  })

// it('Login unsuccessful ', () => {// testcase 2
//   cy.visit('https://kapitalincauthdev.b2clogin.com/kapitalincauthdev.onmicrosoft.com/b2c_1_signin/oauth2/v2.0/authorize?client_id=42d8b99b-7dfc-4c4d-8afb-07c8ff8ad253&scope=https%3A%2F%2Fkapitalincauthdev.onmicrosoft.com%2Ffd3139dd-4fe5-49c0-b72c-3499074aaa84%2FAPI.ReadWrite.All%20openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Ftest.kapcharge.com%2Fauthentication%2Flogin-callback&client-request-id=335a7082-fe8f-41ea-9a54-e1c06326d97e&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=2.33.0&client_info=1&code_challenge=9WyVcBlEZpdIJKiZSQPz2TrfDpHT-fJIIulekPgWARg&code_challenge_method=S256&nonce=6fd9fcf6-cbb0-45ff-a111-7fd8c1ab9898&state=eyJpZCI6IjlkMDZiNDM3LTdkYjQtNDAwMC1hZmI1LTQ0MmEyNzZlYjFmZCIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D%7C711095a9-23ba-47ae-b9df-148adc891110')
//  cy.get('#email').type(Cypress.env('credentials').Invalid_username);
//   cy.get('input[id="password"]').type(Cypress.env('credentials').Invalid_password)
//   cy.get('#next').click();
// cy.wait(2000)
//   // Add assertions to verify failed login
//   cy.get('.pageLevel > p').should('be.visible')
//   . and('contain', 'Your password is incorrect')

  

// })



})
