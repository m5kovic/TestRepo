import { faker } from "@faker-js/faker";

let comp = faker.company.name();
let address = faker.address.streetAddress();

describe("menage a building", () => {
  before("login to the admin platform", () => {
    cy.adminLogin();
  });

  it("navigate to building page", () => {
    cy.get('a[href="/building"]').click({ force: true });
    cy.url().should("eq", "https://admin.workspace.beta.vegait.rs/building");
  });

  it("create new building", () => {
    cy.get('a[href="/building/new"]')
      .should("be.visible")
      .click({ force: true });
    cy.url().should(
      "eq",
      "https://admin.workspace.beta.vegait.rs/building/new"
    );
    cy.get('input[name="name"]').type(comp);
    cy.get('input[name="address"]').type(address);
    cy.get("button.form__dropdown-btn").click();
    cy.get("ul li").each(($el, index, $list) => {
      if ($el.text() === "Niš") {
        cy.wrap($el).click();
      }
    });
    cy.get('button[type="submit"]').click({ force: true });
    cy.get('div[role="status"]')
      .should("be.visible")
      .contains("Successfully created");
    cy.wait(2000);
  });

  it("delete building", () => {
    cy.get('tr[class="table__row"]')
      .last()
      .should("contain.text", comp)
      .within(() => {
        cy.get('button[class="btn btn--red"]').should("be.visible").click();
      });
    cy.get('button[class="btn btn--green popup__btn"]').click();
    cy.get('div[role="status"]')
      .should("be.visible")
      .contains("Successfully deleted");
  });
});
