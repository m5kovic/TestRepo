import { faker } from "@faker-js/faker";

let comp = faker.company.name();
let comp2 = faker.company.name();

describe("menage company", () => {
  before("login to the admin platform", () => {
    cy.adminLogin();
  });

  it("navigate to company page", () => {
    cy.get('a[href="/company"]').click({ force: true });
    cy.url().should("eq", "https://admin.workspace.beta.vegait.rs/company");
  });

  it("create new company", () => {
    cy.get('a[href="/company/new"]')
      .should("be.visible")
      .click({ force: true });
    cy.url().should("eq", "https://admin.workspace.beta.vegait.rs/company/new");
    cy.get("input").type(comp);
    cy.get("button").contains("Save").click({ force: true });
    cy.get('div[role="status"]')
      .contains("Successfully created")
      .should("be.visible");
  });

  it("edit company", () => {
    cy.get('tr[class="table__row"]')
      .last()
      .within(() => {
        cy.get('button[class="btn btn--green"]')
          .should("be.visible")
          .click({ force: true });
      });
    cy.get("input").clear().type(comp2);
    cy.wait(1000);
    cy.get("button").contains("Save").click({ force: true });
    cy.wait(500);
    cy.get('div[role="status"]')
      .contains("Successfully updated")
      .should("be.visible");
  });

  it("delete company", () => {
    cy.get('tr[class="table__row"]')
      .last()
      .should("contain.text", comp2)
      .within(() => {
        cy.get('button[class="btn btn--red"]').should("be.visible").click();
      });
    cy.get('button[class="btn btn--green popup__btn"]').click();
    cy.wait(500);
    cy.get('div[role="status"]')
      .contains("Successfully deleted")
      .should("be.visible");
  });
});
