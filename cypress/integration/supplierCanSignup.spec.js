describe("Visitor can sign up", () => {
  beforeEach(function() {
    cy.server();
  });
  it("Can successfully sign up as a client", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth",
      response: "fixture:successful_supplier_signup_response.json"
    });
    cy.supplier_successful_signup(
      "plumber@plumber.com",
      "Plumbing and fix AB",
      "stockholm",
      "password",
      "password"
    );
    cy.get("#submit-account-button").click();
    cy.contains("Welcome Plumbing and fix AB!");
  });