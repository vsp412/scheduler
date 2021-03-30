//cypress tests to check basic navigation
describe("Navigation", () => {

  //checks if main page visited
  it("should visit root", () => {
    cy.visit("/");
  });

  //checks if can change day
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("li", "Tuesday").click();
    cy.contains("li", "Tuesday").should("have.class", "day-list__item--selected");
  });
});