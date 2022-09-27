import { faker } from "@faker-js/faker";

let floor = faker.company.name();
let floor2 = faker.company.bsBuzz();

describe("menage a floor", () => {
  before("login to the admin platform", () => {
    cy.adminLogin();
  });

  it("navigate to the floor page", () => {
    cy.get('a[href="/floor"]').click({ force: true });
    cy.url().should("eq", "https://admin.workspace.beta.vegait.rs/floor");
  });

  it("create new floor", () => {
    cy.get('a[href="/floor/new"]').should("be.visible").click({ force: true });
    cy.url().should("eq", "https://admin.workspace.beta.vegait.rs/floor/new");
    cy.get('input[name="adminName"]').type(floor);
    cy.get('input[name="displayName"]').type(floor2);
    cy.get(".form__dropdown-btn").click();
    cy.get("ul li").last().click();
    cy.get('input[name="level"]').clear().type("3");
    cy.get('input[type="file"]').attachFile("test-svgrepo-com.svg");
    cy.get("button").contains("Save").click({ force: true });
    cy.wait(500);
    cy.get('input[placeholder="Search by admin name..."]').type(floor);
    cy.get("tr td").contains(floor).should("be.visible");
  });

  it("delete floor", () => {
    cy.get('tr[class="table__row"]').within(() => {
      cy.get('button[class="btn btn--red"]').should("be.visible").click();
    });
    cy.get('button[class="btn btn--green popup__btn"]').click();
    cy.wait(500);
    cy.get('div[role="status"]')
      .should("be.visible")
      .contains("Successfully deleted");
  });
});
