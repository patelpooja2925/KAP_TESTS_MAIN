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
        cy.get('#email', { timeout: 30000 }).should('be.visible').type(login_username, { log: false });

        cy.get('#password').should('be.visible').type(login_password, {log: false, parseSpecialCharSequences: false,
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
  cy.env(['credentials'], { log: false }).then(({ credentials }) => {
    const { login_username, login_password } = credentials;
    cy.log(`Active baseUrl1 = ${Cypress.config('baseUrl1')}`);

   cy.visit('https://test-us.kapcharge.com/authentication/login');

    cy.origin('https://kapitalincauthdevus.b2clogin.com',
      { args: { login_username, login_password } },
      ({ login_username, login_password }) => {
        cy.get('#email', { timeout: 30000 }).should('be.visible').type(login_username, { log: false });

        cy.get('#password').should('be.visible').type(login_password, {log: false, parseSpecialCharSequences: false,
          });

        cy.get('#next').click();
      }
    );
  });

  cy.get('#menu-item-transactions', { timeout: 60000 })
    .should('be.visible');
});







Cypress.Commands.add('loginB2C_CAS', () => {
  cy.env(['credentialsCAStaging'], { log: false }).then(({credentialsCAStaging}) => {
    const { login_username, login_password } = credentialsCAStaging;
    cy.log(`Active baseurl3 = ${Cypress.config('baseurl3')}`);

   cy.visit('https://app-staging.kapcharge.com/authentication/login');

    cy.origin('https://kapitalincauthstaging.b2clogin.com',
      { args: { login_username, login_password } },
      ({ login_username, login_password }) => {
        cy.get('#email', { timeout: 30000 }).should('be.visible').type(login_username, { log: false });

        cy.get('#password').should('be.visible').type(login_password, {log: false, parseSpecialCharSequences: false,
          });

        cy.get('#next').click();
      }
    );
  });

  cy.get('#menu-item-transactions', { timeout: 60000 })
    .should('be.visible');
});

// cypress/support/commands.js

Cypress.Commands.add('loginB2C_CAProd', () => {
  return cy.env(['baseurl2', 'credentialsUS'], { log: false })
    .then(({ baseurl2, credentialsUS }) => {
      const { login_username, login_password } = credentialsUS;

      cy.visit(new URL('/authentication/login', baseurl2).href);

      cy.origin(
        'https://login.kapcharge.com',
        { args: { login_username, login_password } },
        ({ login_username, login_password }) => {
          cy.get('#email', { timeout: 30000 })
            .should('be.visible')
            .type(login_username, { log: false, parseSpecialCharSequences: false });

          cy.get('#password')
            .should('be.visible')
            .type(login_password, { log: false, parseSpecialCharSequences: false });

          cy.get('#next').click();
        }
      );

      cy.pause(); // MFA complete karo, phir Cypress Runner mein Resume dabao.

      cy.get('#menu-item-transactions', { timeout: 90000 })
        .should('be.visible');
    });
});

