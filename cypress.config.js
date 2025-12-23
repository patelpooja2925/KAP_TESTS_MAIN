const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'xrqnzg',
  record: true,

  e2e: {
    baseUrl: 'https://test.kapcharge.com', // ✅ MUST be baseUrl
    experimentalSessionAndOrigin: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    chromeWebSecurity: false, // ✅ REQUIRED for Azure B2C

    setupNodeEvents(on, config) {
      return config;
    },
  },

  browser: "chrome",
  viewportWidth: 1200,
  viewportHeight: 800
});
