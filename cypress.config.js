const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 410,
  viewportHeight: 860,
  projectId: 'pbs6ys',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
