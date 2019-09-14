describe("Client can create service request", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("http://localhost:3001");
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/service_request",
      response: "fixture:successful_saving_requests_response.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/categories",
      response: "fixture:api_categories.json",
      status: 200
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/post_code_queries",
      response: "fixture:successful_fetching_city_response.json",
      status: 200
    });
  });

  it("Request is posted successfully [EN]", () => {
    cy.get("#get-location-button").click();
    cy.get("#post-code-input").type("11240");
    cy.contains("Stockholm, Stockholm");
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
    cy.wait(2000);
  });

  it("Request is posted successfully [SV]", () => {
    cy.get("#language-options").invoke("show");
    cy.get(".SV").click();
    cy.get("#get-location-button").click();
    cy.get("#post-code-input").type("11240");
    cy.contains("Stockholm, Stockholm");
    cy.get("#create-request-button").click();
    cy.get("#request-form").within(() => {
      cy.get("#title").type("Build my webpage");
      cy.get('select[id="category"]').select("IT tjänster");
      cy.get("#details").type("Im a professional painter, I want a website to show the world my art");
      cy.get('select[id="budget"]').select("Stor")
      cy.get('select[id="timeframe"]').select("Chill")
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

    cy.get("#get-location-button").click();
    cy.get("#post-code-input").type("11240");
    cy.contains("Stockholm, Stockholm");
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
    cy.contains("Something went wrong! Please try again.");
    cy.wait(2000);
  });
});
