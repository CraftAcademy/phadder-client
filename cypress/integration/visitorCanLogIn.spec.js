describe("User can log in", () => {
  beforeEach(() => {
    cy.server();
  });

  it("Successfully logs in", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/sign_in",
      response: "fixture:successful_log_in.json"
    });
    cy.user_login("johndoe@mail.com", "password");
    cy.contains("Welcome to Phadder!");
    cy.wait(2000)
  });


  it("Attempts to log in with invalid credentials", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/sign_in",
      response: "fixture:unsuccessful_log_in.json",
      status: 400
    });
    cy.user_login("johndoe@mail.com", "wrong_password");
    cy.contains("Invalid login credentials. Please try again.");
    cy.wait(2000);
  });
});
