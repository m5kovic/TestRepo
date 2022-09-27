describe("Login & test cosmos page", () => {
  beforeEach("visit cosmos", () => {
    cy.userLogin();
    cy.visit("/cosmos");
  });

  after("Logout", () => {
    cy.get('button[class="header__hamburger js-header-hamburger"]').click();
    cy.get("button").contains("Log out").click();
    cy.url().should("eq", "https://workspace.beta.vegait.rs/login");
  });

  it("find colleague working from office", () => {
    cy.findItem(0, "Ilija Bubanj");
    cy.get("text").contains("Ilija Bubanj").should("be.visible");
  });

  it("find floor", () => {
    cy.findItem(1, "4th floor, Alex Hotel");
    cy.get("h1[class='floor__title']").within(() => {
      cy.contains("NS - Cara Dušana, Cara Dušana 6, Novi Sad, Serbia").should(
        "be.visible"
      );
      cy.contains("4th floor").should("be.visible");
    });
  });

  it("find building", () => {
    cy.findItem(2, "NS - Cara Dušana");
    cy.get('div[class="building__floors-wrap"]')
      .children()
      .should("have.length", 7);
    cy.get("h1[class='building__title']").should(
      "contain.text",
      "NS - Cara Dušana, Novi Sad, Serbia"
    );
  });

  it("find colleague working from home", () => {
    cy.workingFromHome("Bojan Stanisin");
    cy.get('button[class="popup__close"]').click();
  });
});
