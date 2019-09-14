// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "client_successful_signup",
  (first_name, last_name, email, password, password_confirmation) => {
    cy.visit("http://localhost:3001");
    cy.get("#sign-up-button").click();
    cy.get("#signup-form").within(() => {
      cy.get('input[id="first-name"]').type(first_name);
      cy.get('input[id="last-name"]').type(last_name);
      cy.get('input[id="email"]').type(email);
      cy.get('input[id="password"]').type(password);
      cy.get('input[id="password-confirmation"]').type(password_confirmation);
    });
  }
);

Cypress.Commands.add("user_login", (email, password) => {
  cy.visit("http://localhost:3001");
  cy.get("#login-button").click();
  cy.get("#login-form").within(() => {
    cy.get("#email").type(email);
    cy.get("#password").type(password);
  });
  cy.get("#login-form-submit").click();
});

Cypress.Commands.add("file_upload", file => {
  const selector = "#select-image";
  const fixturePath = file;
  const type = "image/jpeg";

  cy.get(selector).then(subject =>
    cy.window().then(win =>
      cy
        .fixture(fixturePath, "base64")
        .then(Cypress.Blob.base64StringToBlob)
        .then(blob => {
          const el = subject[0];
          const testFile = new win.File([blob], name, { type });
          const dataTransfer = new win.DataTransfer();
          dataTransfer.items.add(testFile);
          el.files = dataTransfer.files;
          cy.wrap(subject).trigger("change", { force: true });
        })
    )
  );
});

