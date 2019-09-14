describe("Language is detected when writing request description", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("http://localhost:3001");
  });

  it("Language correctly detected", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/language_queries",
      response: "fixture:successful_language_detection_response.json",
      status: 200
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/post_code_queries",
      response: "fixture:successful_fetching_city_response.json",
      status: 200
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/categories",
      response: "fixture:api_categories.json",
      status: 200
    });
    cy.get("#get-location-button").click();
    cy.get("#post-code-input").type("11240");
    cy.contains("Stockholm, Stockholm");
    cy.get("#create-request-button").click();
    cy.get("#request-form").within(() => {
      cy.get("#title").type("Build my webpage");
      cy.get('select[id="category"]').select("IT Services");
      cy.get("#details").type("My roof just fell down because of the storm and I need someone qualified to fix it. This is an urgent request. ");
      cy.wait(2000);
      cy.get("#en").should("be.checked");
    });
    cy.contains("You are writing in English...");
  });
})