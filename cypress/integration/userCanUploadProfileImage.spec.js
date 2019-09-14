describe("Logged in users can update there profile picture", () => {
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
      method: "PUT",
      url: "http://localhost:3000/api/profile_update",
      response: "fixture:successful_uploads_profile_image_response.json",
      status: 200
    });;
      cy.wait(6000)
      cy.get("#profile-button").click();
      cy.contains("Welcome John, to your profile page!");
      cy.get("#edit-profile-picture").click()
      cy.get("#select-image").click();
      cy.file_upload("image.jpeg");
      cy.get("#upload-button").click();
      cy.contains("Profile picture successfully uploaded");
    });

  it("User updates profile picture unsuccesfull", () => {
    cy.route({
      method: "PUT",
      url: "http://localhost:3000/api/profile_update",
      response: "fixture:unsuccessful_upload_profile_image_response.json",
      status: 401
    });
    cy.wait(6000)
    cy.get("#profile-button").click();
    cy.get("#edit-profile-picture").click()
    cy.get("#select-image").click();
    cy.file_upload("image.jpeg");
    cy.get("#upload-button").click(); 
    cy.contains("Your image was not uploaded, please try again.");
  });
});
