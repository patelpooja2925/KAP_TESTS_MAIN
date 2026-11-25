const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'xrqnzg',
  record: true,

  e2e: {
    baseUrl: 'https://test.kapcharge.com', // ✅ MUST be baseUrl
    baseUrl1:'https://test-us.kapcharge.com',
    baseurl3: 'https://app-staging.kapcharge.com',
    baseurl2:'https://app.kapcharge.com',
  
    experimentalSessionAndOrigin: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    chromeWebSecurity: true, // ✅ REQUIRED for Azure B2C

    setupNodeEvents(on, config) {
      const { transaction_type, transaction_methods } = config.env;

      if (!transaction_type || !transaction_methods) {
        throw new Error(
          'Missing transaction_type or transaction_methods. Check cypress.env.json or CI settings.'
        );
      }

      config.expose = {
        ...config.expose,
        transaction_type,
        transaction_methods,
          menu_items: config.env.menu_items,
      };

      return config;
    },
  },

  browser: "chrome",
  viewportWidth: 1200,
  viewportHeight: 800
});