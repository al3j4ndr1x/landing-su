// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
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

// import { authService } from '../../src/app/auth/auth.service'
// import { LoginComponent } from '../../src/app/auth/login/login.component'

/**
 * Custom command to log in using application method.
 * Commands are automatically waited on, thus we don't need extra "cy.wrap"
 * around the returned promise.
 *
 * @example cy.loginEmail()
 */
// Cypress.Commands.add('loginEmail', (email, password, rememberMe) => {
//     return AuthService.prototype.emailLogin(email, password, rememberMe)
// })

// Cypress.Commands.add('loginEmail', () => {
//   return LoginComponent.prototype.login()
// })

// Cypress.Commands.add(
//   'login',
//   (username = Cypress.env('FAKE_EMAIL'), password = Cypress.env('FAKE_PASSWORD')) => {
//     return authService.login(username, password, true)
//   }
// )
