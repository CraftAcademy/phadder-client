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

Cypress.Commands.add(
  "supplier_successful_signup",
  (email, company_name, location, password, password_confirmation) => {
    cy.visit("http://localhost:3001");
    cy.get("#sign-up-supplier").click();
    cy.get("#signup-form").within(() => {
      cy.get('input[id="email"]').type(email);
      cy.get('input[id="company-name"]').type(company_name);
      cy.get('input[id="location"]').type(location);
      cy.get('input[id="password"]').type(password);
      cy.get('input[id="password-confirmation"]').type(password_confirmation);
    });
  }
);