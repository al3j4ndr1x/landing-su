/// <reference types="Cypress" />

describe('Landing SU Home', () => {

  beforeEach(() => {
    // cy.visit('/')
  })

  it('has to visit the home', () => {
    cy.visit('/') // Assert that visit the home page
  });

  it('has a heading Welcome message', () => {
    cy.get('h6')
      .should('contain', 'Welcome to The Landing SU!'); // Assert that contain a title
  });

  it('has a button Get early access', () => {
    cy.get('button[data-cy=submit]')
      .should('be.visible') // Assert that button is visible
      .and('contain', 'Get early access'); // Assert that contain `Get early access`
  });

  it('go to the Sign Up form by new early-bird', () => {
    cy.get('button[data-cy=submit]').click();
  });

  it('has a URL with /register', () => {
    // we should be redirected to /register
    // Assert URL register
    cy.url().should('include', '/register')
  });

  it('has a back button and then return to base', () => {
    // register has a back button
    cy.get('.navigation>a')
      .should('exist')
      .should('be.visible')
      .and('have.class', 'link back-link')
      .click();

    // Assert base URL root home
    cy.url().should('eq', Cypress.config().baseUrl + '/')

  });
});
