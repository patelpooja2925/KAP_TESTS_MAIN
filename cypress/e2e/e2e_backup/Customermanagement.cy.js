import '@testing-library/cypress/add-commands'
describe('Searching customer', () => {
    it('Search Customer with Merchant', () => {
        
    
            cy.visit(Cypress.env('baseurl'))
               
                cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
                cy.get('#email').type(Cypress.env('credentials').login_username)
                cy.get('input[id="password"]').type(Cypress.env('credentials').login_password) ///provide correct password when running script
                cy.get('#next').click()
                cy.wait(2000)
            
            })
            cy.get('#menu-item-customers').contains(Cypress.env('menu_items').item_customers).click()
            cy.get('#menu-item-customer-management').contains(Cypress.env('menu_item_customers').item_customer_management).click()
            cy.wait(5000)

    cy.get('#multiSelectDropDownListMerchant_one').click({ force: true });
    cy.wait(8000);
    cy.get('#multiSelectDropDownListMerchant_one_5').click({ force: true });
    cy.get('#multiSelectDropDownListMerchant_one_6').click({ force: true });
    cy.wait(2000)  
    
     cy.get('#btn_search').click({force:true})
     cy.wait(6000);
            
            })
            
        it('Search Customer with Merchant and Province', () => {
    
            cy.visit(Cypress.env('baseurl'))
               
                cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
                cy.get('#email').type(Cypress.env('credentials').login_username)
                cy.get('input[id="password"]').type(Cypress.env('credentials').login_password) ///provide correct password when running script
                cy.get('#next').click()
                cy.wait(3000)
            })
            cy.get('#menu-item-customers').contains(Cypress.env('menu_items').item_customers).click()
            cy.get('#menu-item-customer-management').contains(Cypress.env('menu_item_customers').item_customer_management).click()
            cy.wait(8000)

cy.get('#multiSelectDropDownListMerchant_one').click({ force: true });
cy.wait(6000);
cy.get('#multiSelectDropDownListMerchant_one_13').click({ force: true });

cy.get('#multiSelectDropDownListMerchant_one_12').click({ force: true });
cy.wait(4000)

cy.get('#ddl_provinceDropDownList').click({ force: true });
const province = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];
const randomProvince = province[Math.floor(Math.random() * province.length)];
cy.get('#ddl_provinceDropDownList_popup').find('li').contains(randomProvince).click({ force: true });
//cy.get('#txt_customer_name')
//cy.get('#txt_email')
//cy.get('#txt_phone')    
//cy.get('#CustomerIDFilter').type('212795')    
//cy.get('#txt_CodePostal')
//cy.get('#mls_selectTags')
    cy.get('#btn_search').click({force:true})  
     cy.wait(6000);
    
        }) 

        it('Search By Customer Name', () => {
    
            cy.visit(Cypress.env('baseurl'))
               
                cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
                cy.get('#email').type(Cypress.env('credentials').login_username)
                cy.get('input[id="password"]').type(Cypress.env('credentials').login_password) ///provide correct password when running script
                cy.get('#next').click()
                cy.wait(3000)
            })
            cy.get('#menu-item-customers').contains(Cypress.env('menu_items').item_customers).click()
            cy.get('#menu-item-customer-management').contains(Cypress.env('menu_item_customers').item_customer_management).click()
            cy.wait(1000)

cy.get('#txt_customer_name').type('ANNALISE MANTE').click({force:true})
//cy.get('#txt_email')
//cy.get('#txt_phone')    
//cy.get('#CustomerIDFilter').type('212795')    
//cy.get('#txt_CodePostal')
//cy.get('#mls_selectTags')
    cy.get('#btn_search').click({force:true})  
     cy.wait(6000);
    
        }) 
        it('Search By Customer Email', () => {
    
            cy.visit(Cypress.env('baseurl'))
               
                cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
                cy.get('#email').type(Cypress.env('credentials').login_username)
                cy.get('input[id="password"]').type(Cypress.env('credentials').login_password) ///provide correct password when running script
                cy.get('#next').click()
                cy.wait(3000)
            })
            cy.get('#menu-item-customers').contains(Cypress.env('menu_items').item_customers).click()
            cy.get('#menu-item-customer-management').contains(Cypress.env('menu_item_customers').item_customer_management).click()
            cy.wait(1000)


cy.get('#txt_email').type('pooja@kapitalinc.com').click({force:true})
//cy.get('#txt_email')
//cy.get('#txt_phone')    
//cy.get('#CustomerIDFilter').type('212795')    
//cy.get('#txt_CodePostal')
//cy.get('#mls_selectTags')
    cy.get('#btn_search').click({force:true})  
     cy.wait(6000); 
        
    })

    it('Search By Customer Phone Number ', () => {
    
        cy.visit(Cypress.env('baseurl'))
           
            cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
            cy.get('#email').type(Cypress.env('credentials').login_username)
            cy.get('input[id="password"]').type(Cypress.env('credentials').login_password) ///provide correct password when running script
            cy.get('#next').click()
            cy.wait(3000)
        })
        cy.get('#menu-item-customers').contains(Cypress.env('menu_items').item_customers).click()
        cy.get('#menu-item-customer-management').contains(Cypress.env('menu_item_customers').item_customer_management).click()
        cy.wait(1000)



 

cy.get('#txt_phone').click({ force: true });
cy.get('#txt_phone')
    .invoke('val', '438-979-2908')
    .trigger('input')
    .trigger('blur');
    cy.get('#txt_phone')
            .should('have.value', "438-979-2908", { timeout: 4000 });

//cy.get('#CustomerIDFilter').type('212795')    
//cy.get('#txt_CodePostal')
//cy.get('#mls_selectTags')
cy.get('#btn_search').click({force:true})  




    })

})