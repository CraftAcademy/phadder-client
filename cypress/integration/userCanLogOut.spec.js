describe("User Log-Out", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/sign_in",
      response: "fixture:successful_log_in.json"
    });
    cy.route({
      method: "DELETE",
      url: "http://localhost:3000/api/auth/sign_out",
      response: "fixture:successful_user_logout.json"
    });
  });

  it("User can successfully log out", () => {
    cy.user_login("johndoe@mail.com", "password");
    cy.wait(6000);
    cy.get("#logout-button").should("exist");
    cy.get("#logout-button").click();
    cy.contains("You have successfully logged out.");
    cy.get("#login-button").should("exist");
  });
});
