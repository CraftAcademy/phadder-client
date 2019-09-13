describe("Client can create service request", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("http://localhost:3001");
  });

  it("Request is posted successfully", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/service_request",
      response: "fixture:successful_saving_requests_response.json",
      status: 200
    });
    cy.get("#create-request-button").click();
    cy.get("#request-form").within(() => {
      cy.get("#title").type("Build my webpage");
      cy.get('select[id="category"]').select("IT Services");
      cy.get("#details").type(
        "Im a proffensional painter, I want a website to show the world my art. It needs to be pretty and user friendly"
      );
      cy.get('select[id="budget"]').select("Big")
      cy.get('select[id="timeframe"]').select("Long Term")
      cy.get("#submit-request-button").click();
    });
    cy.contains("Request successfully created");
    cy.get("#create-request-form").should("not.exist");
    cy.wait(2000)
  });

  it("Request is not created successfully", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/service_request",
      response: "fixture:unsuccessful_creating_request_response.json",
      status: 422
    });
    cy.get("#create-request-button").click();
    cy.get("#request-form").within(() => {
      cy.get("#title").type("Build my webpage");
      cy.get('select[id="category"]').select("IT Services")
      cy.get("#details").type("Im a proffensional painter, I want a website to show the world my art. It needs to be pretty and user friendly");
      cy.get('select[id="budget"]').select("Big")
      cy.get('select[id="timeframe"]').select("Long Term")
      cy.file_upload("image.jpeg");
      cy.get("#submit-request-button").click();
    });
    cy.contains("Something went wrong! Please try again.")
    cy.wait(2000);
  })
});