//cypress tests to check appointment/interview scheduling workflow
describe("appointments", () => {

  //runs before each test
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
   });

  //end to end test for creating interview
  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  //end to end test for editing interview
  it("should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({ force: true });
    cy.get("[data-testid=student-name-input]").clear().type("Jack");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Jack");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  //end to end test for deleting interview
  it("should delete an interview", () => {
    cy.get("[alt=Delete]").first().click({ force: true });
    cy.contains("Confirm").click();
    cy.contains("Removing");
    cy.contains("removing").should('not.exist');
    cy.contains(".appointment__card--show", "Archie Cohen").should('not.exist');
  });
});