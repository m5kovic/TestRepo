/// <reference types="Cypress"/>

import "cypress-file-upload";

Cypress.Commands.add("userLogin", () => {
  cy.session("login to the user platform", () => {
    cy.visit("/login");
    cy.get('input[name="username"]').type(Cypress.env("username"));
    cy.get('input[name="password"]').type(Cypress.env("password"));
    cy.get("button").click();
    cy.url().should("contains", "workspace.beta");
    cy.get('button[class="homepage__btn homepage__btn--orange"]').click();
  });
});

Cypress.Commands.add("adminLogin", () => {
  cy.visit("https://admin.workspace.beta.vegait.rs/login");
  cy.get('input[name="username"]').type(Cypress.env("username"));
  cy.get('input[name="password"]').type(Cypress.env("password"));
  cy.get("button").click();
  cy.url().should("contains", "admin.workspace");
});

Cypress.Commands.add("findItem", (n, itemName) => {
  // cy.intercept(
  //   "GET",
  //   "https://nominatim.openstreetmap.org/search?q=Cara%20Du%C5%A1ana%206%2C%20Novi%20Sad&format=json"
  // ).as("space");
  cy.get("input").eq(n).should("be.visible").type(itemName);
  // cy.wait("@space").then(() => {
  cy.contains(itemName).should("be.visible").click();
  // });
});

Cypress.Commands.add("workingFromHome", (name) => {
  cy.intercept("GET", "https://api.workspace.beta.vegait.rs/api/employees").as(
    "Working from home screen"
  );
  cy.get('button[class="header__hamburger js-header-hamburger"]').click();
  cy.contains("Working from home").click();
  cy.wait("@Working from home screen").then(() => {
    cy.get("input").should("be.visible").type(name);
  });
  cy.get("div[class='popup__item-cell']")
    .eq(0)
    .contains(name)
    .should("be.visible");
});
