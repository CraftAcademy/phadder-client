describe("Looged in users can see theres service request", () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/auth/sign_in",
      response: "fixture:successful_log_in.json"
    });
    cy.user_login("johndoe@mail.com", "password");      
  });

  it("User updates profile picture succesfully", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/service_request",
      response: "fixture:successfully_gets_service_requests_response.json",
      status: 200
    });;
      cy.get("#profile-button").click();
      cy.get("#my-requests-button").click();
      cy.get("#service-request").within(() => {
      cy.get("").should("contain", "");  
        
    });
  })
})
