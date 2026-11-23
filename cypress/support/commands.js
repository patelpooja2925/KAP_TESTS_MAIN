// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
// ***********************************************

// -- Parent command example --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- Child command example --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- Dual command example --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

// -- Overwrite example --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ----------------------
// Iframe helper
// ----------------------
Cypress.Commands.add(
  'iframe',
  { prevSubject: 'element' },
  ($iframe) => {
    return new Cypress.Promise((resolve) => {
      $iframe.on('load', () => {
        resolve($iframe.contents().find('body'));
      });
    });
  }
);

// Force clear globally
Cypress.Commands.overwrite(
  'clear',
  (originalFn, subject, options = {}) => {
    return originalFn(subject, { ...options, force: true });
  }
);

// Force type globally
Cypress.Commands.overwrite(
  'type',
  (originalFn, subject, text, options = {}) => {
    return originalFn(subject, text, { ...options, force: true });
  }
);


// ----------------------
// CA Login Command
// ----------------------
Cypress.Commands.add('loginB2C_CA', () => {
  cy.env(['credentials'], { log: false }).then(({ credentials }) => {
    const { login_username, login_password } = credentials;

    cy.visit('/authentication/login');

    cy.origin('https://kapitalincauthdev.b2clogin.com',
      { args: { login_username, login_password } },
      ({ login_username, login_password }) => {
        cy.get('#email', { timeout: 30000 })
          .should('be.visible')
          .type(login_username, { log: false });

        cy.get('#password')
          .should('be.visible')
          .type(login_password, {
            log: false,
            parseSpecialCharSequences: false,
          });

        cy.get('#next').click();
      }
    );
  });

  cy.get('#menu-item-transactions', { timeout: 60000 })
    .should('be.visible');
});
   
// ----------------------
// US Login Command
// ----------------------
Cypress.Commands.add('loginB2C_US', () => {
    const base = Cypress.env('baseurl1'); // use a separate env variable for US
    const baseOrigin = base.replace(/\/$/, '');

    cy.visit(base);

    cy.get('body').then($b => {
        if ($b.find('#menu-item-transactions').length) return;

        cy.visit(`${baseOrigin}/authentication/login`);

        cy.origin('https://kapitalincauthdevus.b2clogin.com', () => { // US B2C domain
            cy.get('#email', { timeout: 30000 }).should('be.visible')
              .type(Cypress.env('credentialsUS').login_username);
            cy.get('input[id="password"]').should('be.visible')
              .type(Cypress.env('credentialsUS').login_password, { log: false });
            cy.get('#next').click();
        });

        cy.wait(2000);

        cy.get('body', { timeout: 60000 }).should($body => {
            expect($body.find('#menu-item-transactions').length, 'menu item after login').to.be.greaterThan(0);
        });
    });
});
//CA dev Login Command
Cypress.Commands.add('loginB2C_CAS', () => {
    const base = Cypress.env('baseurl3'); // use a separate env variable for US
    const baseOrigin = base.replace(/\/$/, '');

    cy.visit(base);

    cy.get('body').then($b => {
        if ($b.find('#menu-item-transactions').length) return;

        cy.visit(`${baseOrigin}/authentication/login`);

        cy.origin('https://kapitalincauthStaging.b2clogin.com', () => { // US B2C domain
            cy.get('#email', { timeout: 30000 }).should('be.visible')
              .type(Cypress.env('credentialsCAStaging').login_username);
            cy.get('input[id="password"]').should('be.visible')
              .type(Cypress.env('credentialsCAStaging').login_password, { log: false });
            cy.get('#next').click();
        });

        cy.wait(2000);

        cy.get('body', { timeout: 60000 }).should($body => {
            expect($body.find('#menu-item-transactions').length, 'menu item after login').to.be.greaterThan(0);
        });
    });
});

// cypress/support/commands.js

Cypress.Commands.add('loginB2C_CAProd', () => {
  const base = Cypress.env('baseurl2');
  const baseOrigin = base.replace(/\/$/, '');

  const username = Cypress.env('credentialsUS').login_username;
  const password = Cypress.env('credentialsUS').login_password;

  cy.visit(base);

  cy.get('body').then($b => {
    if ($b.find('#menu-item-transactions').length) return;

    cy.visit(`${baseOrigin}/authentication/login`);

    cy.origin('https://login.kapcharge.com',
      { args: { username, password } },
      ({ username, password }) => {
        cy.get('#email', { timeout: 30000 })
          .should('be.visible')
          .clear()
          .type(username);

        cy.get('#password', { timeout: 30000 })
          .should('be.visible')
          .clear()
          .type(password, { log: false });

        cy.get('#next')
          .should('be.visible')
          .click();

        
        cy.pause();
      }
    );

    cy.get('#menu-item-transactions', { timeout: 90000 })
      .should('be.visible');
  });
});