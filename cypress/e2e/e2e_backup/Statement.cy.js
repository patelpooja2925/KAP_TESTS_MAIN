import '@testing-library/cypress/add-commands'
const today = new Date().toLocaleDateString('en-US');
describe('Generte  a new Statement', () => {
    it('search statement', () => {
        
    
            cy.visit(Cypress.env('baseurl'))
               
                cy.origin('https://kapitalincauthdev.b2clogin.com', () => {
                cy.get('#email').type(Cypress.env('credentials').login_username)
                cy.get('input[id="password"]').type(Cypress.env('credentials').login_password) ///provide correct password when running script
                cy.get('#next').click()
                cy.wait(1000)
            
            })
            cy.get('#menu-item-reports').click({force:true})
            cy.get('#menu-item-statement').click({force:true})
            cy.get('#statement-input-merchant').click({force:true})
            cy.get('#statement-input-merchant_options').find('li').contains('KPC_201-Pooja').click({force:true})

                cy.get('#statement-input-start-date').click({force:true})

           
                const today = new Date();
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                const yyyy = today.getFullYear();
                const startDate =`${mm}/${dd}/${yyyy}`;
                
   
                const endDd = String(today.getDate()).padStart(2, '0');
                const endMm = String(today.getMonth() + 1).padStart(2, '0');
                const endYyyy = today.getFullYear();
                const endDate = `${endMm}/${endDd}/${endYyyy}`;
                cy.get('#statement-input-start-date').click({force:true})
                .clear()
                .type(startDate) // Replace with the desired date format if needed
                .trigger('blur');
                cy.get('#statement-input-end-date').click({force:true})
                .clear()
                .type(endDate) // Replace with the desired date format if needed
                .trigger('blur');
            
            cy.get('#statement-button-generate').click()
            //cy.get('#statement-button-clear')
            //cy.get('#statement-button-download')
            //cy.get('.e-dropdown-menu > :nth-child(1)')
            
            



        
        
        
        
        
        
        })})