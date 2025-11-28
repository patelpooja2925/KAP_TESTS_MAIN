const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'xrqnzg',
  "record": true,
  e2e: {
    //base_url2:'https://dev.kapcharge.com/',
    base_url:'https://test.kapcharge.com/',
    experimentalSessionAndOrigin: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      

      
    },
  },
  
    "browser": "chrome",
    viewportWidth: 1200,
    viewportHeight: 800
  
});
