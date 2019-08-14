/// <reference types="Cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('Landing SU Login', () => {

  //const email = chance.email();
  const email = Cypress.env('FAKE_EMAIL');
  const pass = Cypress.env('FAKE_PASSWORD');

  beforeEach(() => {
    //cy.visit('/auth/login')
  })

  it('has to visit the Login view', () => {
    cy.visit('/auth/login') // Assert that to visit the login view
  });

  it('has a heading h1 with Sign In', () => {
    cy.get('h1')
      .should('have.class', 'title')
      .and('contain', 'Sign In'); // Assert that contain a title Sign In
  });

  it('has a sub-title text', () => {
    cy.contains('Hello! Sign in with your email.') // Assert that contain a sub-title class
      .should('have.class', 'sub-title')
  });

  it('has a label Email address:', () => {
    cy.get('form')
      .find('label')
      .first()
      .should('contain', 'Email address:')
  });

  it('has a input type email', () => {
    cy.get('input[name=email]')
      .should('be.visible') // Assert that input is visible
      .and('have.attr', 'placeholder', 'Enter your email address...'); // Assert that have a placeholder attribute
  });

  it('has a label Password:', () => {
    cy.get('form')
      .find('label')
      .should('contain', 'Password:')
  });

  it('has a input type password', () => {
    cy.get('input[name=password]')
      .should('be.visible') // Assert that input is visible
      .and('have.attr', 'placeholder', 'Password'); // Assert that have a placeholder attribute
  });

  it('has a forgot password href', () => {
    cy.get('.forgot-password')
      .should('have.class', 'forgot-password')
      .should('have.attr', 'href', '/auth/request-password')
      .and('contain', 'Forgot Password?')
  });

  it('has a checkbox Remember me', () => {
    cy.get('[data-cy=remembercheck]')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Remember me')
  });

  it('has a button Sign In', () => {
    cy.get('button[data-cy=submit]')
      .should('be.visible') // Assert that button is visible
      .and('contain', 'Sign In'); // Assert that contain `Sign In`
  });

  it(`has a section Don't have an account?`, () => {
    cy.get('.another-action')
      .should('contain', `Don't have an account?`)
  });

  it('has a Sign Up href', () => {
    cy.get('section a')
      .first()
      .should('have.attr', 'href', '/auth/register')
      .and('contain', 'Sign Up')
  });

  it('has an user, fill out the form, then try to log in', () => {
    // Fill out the form
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(pass);

    // Click the Remember me checkbox
    cy.get('[data-cy=remembercheck]')
      .find('[type="checkbox"]')
      .first()
      .check({force: true})
      .should('be.checked')
      .and('have.value', 'on');

    // Click in Sign In button (remember add data-cy="submit" attr to button html tag)
    cy.get('button[data-cy=submit]')
      .click();

    cy.wait(500) // wait 500ms for response

    // custom commands are automatically chained
    // Sign In via AuthService with params: email, pass, rememberMe
    //cy.loginEmail(email, pass, true)
    // Login via LoginComponent
    // cy.loginEmail()

    // cy.visit command will wait for the promise returned from
    // the "userService.login" to resolve. Then local storage item is set
    // and the visit will immediately be authenticated and logged in
    // cy.visit('/profile');

  })

  it('has an user successfully logged in by Profile', function() {
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

    // our auth cookie should be present
    //cy.getCookie('session_id').should('exist')

    // Logout by ProfileComponent
    cy.get('button[data-cy=logoutsubmit]')
      .should('be.visible')
      .and('contain', 'Sign Out') // Assert that contain `Sign Out`
      .click();

    // our auth cookie should be present
    //cy.getCookie('session_id').not.should('exist');

    // Assert URL in login after logout
    cy.url().should('include', '/login')

  })

});
