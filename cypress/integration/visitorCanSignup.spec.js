describe("Visitor can sign up", () => {
  beforeEach(function() {
    cy.server();
  });
  it("Can successfully sign up as a client", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth",
      response: "fixture:successful_client_signup_response.json"
    });
    cy.client_successful_signup(
      "John",
      "Doe",
      "johndoe@email.com",
      "password",
      "password"
    );
    cy.get("#submit-account-button").click();
    cy.contains("Welcome John!");
  });

  it("Can successfully sign up as a supplier", () => {
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

  it("Gets a response if User has invalid email", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth",
      response: "fixture:unsuccessful_client_signup_response.json",
      status: 400
    });
    cy.client_successful_signup(
      "John",
      "Doe",
      "johndoeemail.com",
      "password",
      "password"
    );
    cy.get("#submit-account-button").click();
    cy.contains("Invalid email");
  });
});
