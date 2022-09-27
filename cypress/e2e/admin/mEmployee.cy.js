import { faker } from "@faker-js/faker";

let name = faker.name.fullName();
let email = faker.internet.email();
let username = faker.internet.userName();

describe("menage an employee", () => {
  before("login to the admin platform", () => {
    cy.adminLogin();
  });

  it("navigate to company page", () => {
    cy.get('a[href="/employee"]').click({ force: true });
    cy.url().should("eq", "https://admin.workspace.beta.vegait.rs/employee");
  });

  it("add a new employee", () => {
    cy.get('a[href="/employee/new"]')
      .should("be.visible")
      .click({ force: true });
    cy.url().should(
      "eq",
      "https://admin.workspace.beta.vegait.rs/employee/new"
    );
    cy.get('input[name="name"]').type(name);
    cy.get("button").contains("Select a company...").click();
    cy.get("ul").first().click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="username"]').type(username);
    cy.get("button").contains("Select a role...").click();
    cy.get("ul").last().click();
    cy.get('label[class="form__radio-label"]').eq(0).click();
    cy.get('button[type="submit"]').click({ force: true });
    cy.wait(500);
    cy.get('div[role="status"]')
      .contains("Successfully created")
      .should("be.visible");
  });

  it("search by name", () => {
    cy.get('input[placeholder="Search by name..."]').type(name);
    cy.get("tbody").children().should("have.length", 1);
  });

  it("delete user", () => {
    cy.get('button[class="btn btn--red"]').should("be.visible").click();
    cy.get('button[class="btn btn--green popup__btn"]').click();
    cy.wait(500);
    cy.get('div[role="status"]')
      .contains("Successfully deleted")
      .should("be.visible");
  });
});
