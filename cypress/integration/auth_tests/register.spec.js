/// <reference types="Cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('Landing SU Register', () => {

  const fullName = chance.name();
  const email = chance.email(); // random email
  //const email = Cypress.env('FAKE_EMAIL');
  const pass = Cypress.env('FAKE_PASSWORD');

  beforeEach(() => {
    //cy.visit('/auth/register')
  })

  it('has to visit the Login view', () => {
    cy.visit('/auth/register') // Assert that to visit the register view
  });

  it('has a heading h1 with Sign Up', () => {
    cy.get('h1')
      .should('have.class', 'title')
      .and('contain', 'Sign Up'); // Assert that contain a title Sign In
  });

  // it('has a sub-title text', () => {
  //   cy.contains('Hello! Sign up with your email.') // Assert that contain a sub-title class
  //     .should('have.class', 'sub-title')
  // });

  it('has a label Full name:', () => {
    cy.get('form')
      .find('label')
      .first()
      .should('contain', 'Full name:')
  });

  it('has a input type Full name', () => {
    cy.get('input[name=fullName]')
      .should('be.visible') // Assert that input is visible
      .and('have.attr', 'placeholder', 'Full name'); // Assert that have a placeholder attribute
  });

  it('has a label Email address:', () => {
    cy.get('form')
      .find('label')
      .should('contain', 'Email address:')
  });

  it('has a input type email', () => {
    cy.get('input[name=email]')
      .should('be.visible') // Assert that input is visible
      .and('have.attr', 'placeholder', 'Enter your email address...'); // Assert that have a placeholder attribute
  });

  it('has a input type password', () => {
    cy.get('input[name=password]')
      .should('be.visible') // Assert that input is visible
      .and('have.attr', 'placeholder', 'Password'); // Assert that have a placeholder attribute
  });

  it('has a label Password:', () => {
    cy.get('form')
      .find('label')
      .should('contain', 'Password:')
  });

  it('has a input type password for repeat pass', () => {
    cy.get('input[name=rePass]')
      .should('be.visible') // Assert that input is visible
      .and('have.attr', 'placeholder', 'Confirm Password'); // Assert that have a placeholder attribute
  });

  it('has a label Repeat password:', () => {
    cy.get('form')
      .find('label')
      .should('contain', 'Repeat password:')
  });

  it('has a checkbox Terms with Agree to', () => {
    cy.get('[data-cy=termscheck]')
      .should('exist')
      .should('be.visible')
      .and('contain', 'Agree to');
  });

  it('has a href link with Terms & Conditions', () => {
    cy.get('[data-cy=termscheck] a')
      .first()  // Yield first link in checkbox
      .should('exist')
      .should('be.visible')
      .and('contain', 'Terms & Conditions');
  });

  it('has a button Sign Up', () => {
    cy.get('button')
      .should('be.disabled') // Assert that button is disabled
      .and('contain', 'Sign Up'); // Assert that contain `Sign Up`
  });

  it('has a section Already have an account?', () => {
    cy.get('.another-action')
      .should('contain', 'Already have an account?')
  });

  it('has a Sign In href', () => {
    cy.get('section a')
      .first()
      .should('have.attr', 'href', '/auth/login')
      .and('contain', 'Sign In')
  });

  it('has an user that fill out the form, then try to register', () => {

    // Fill out the form
    cy.get('input[name=fullName]').type(fullName);
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pass);
    cy.get('input[name=rePass]').type(pass);

    // Click the Terms checkbox
    cy.get('[data-cy=termscheck]')
      .find('[type="checkbox"]')
      .first()
      .check({force: true})
      .should('be.checked')
      .and('have.value', 'on');

    // Click in Sign up button (remember to add data-cy="submit" attr to button html tag)
    cy.get('button[data-cy=submit]')
      .should('not.be.disabled') // Assert that button is enabled
      .click()

    cy.wait(1000) // wait 500ms for response

  })

  it('has an user successfully registered', function() {
    // thus the visit will not start until the promise returned
    // by the application code inside the custom command "login" resolves
    // we should be redirected to /profile
    // Assert URL profile
    cy.url()
      .should('include', '/profile')

    // Assert that contain user email logged
    cy.get('[data-cy=useravatar]')
      .should('be.visible')
      .and('contain', email)

    // Logout by ProfileComponent
    cy.get('button[data-cy=logoutsubmit]')
      .should('be.visible')
      .and('contain', 'Sign Out') // Assert that contain `Sign Out`
      .click();

    // Assert URL in login after logout
    cy.url().should('include', '/login')

  })

});
