const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://workspace.beta.vegait.rs",
    env: {
      username: "milos.petkovic",
      password: "Didulidudadu.0509",
    },
    experimentalSessionAndOrigin: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
