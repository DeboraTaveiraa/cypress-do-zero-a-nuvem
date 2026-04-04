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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('#firstName').type('Débora')
  cy.get('#lastName').type('Taveira')
  cy.get('#email').type('deborataveira.dev@gmail.com')
  cy.get('#open-text-area').type('Testando...')

  cy.get('#firstName').should('have.value', 'Débora')
  cy.get('#lastName').should('have.value', 'Taveira')
  cy.get('#email').should('have.value', 'deborataveira.dev@gmail.com')
  cy.get('#open-text-area').should('have.value', 'Testando...')

  cy.contains('button', 'Enviar').click()

  cy.get('.success').should('be.visible')
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithArgument', (user) => {
  cy.get('#firstName').type(user.name)
  cy.get('#lastName').type(user.lastName)
  cy.get('#email').type(user.email)
  cy.get('#open-text-area').type('Testando...')

  cy.get('#firstName').should('have.value', user.name)
  cy.get('#lastName').should('have.value', user.lastName)
  cy.get('#email').should('have.value', user.email)
  cy.get('#open-text-area').should('have.value', 'Testando...')

  cy.contains('button', 'Enviar').click()

  cy.get('.success').should('be.visible')
})

const USER_DEFAULT = {
  name: 'Débora',
  lastName: 'Taveira',
  email: 'deborataveira.dev@gmail.com'
}

Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithArgumentDefault', (user = USER_DEFAULT) => {
  cy.get('#firstName').type(user.name)
  cy.get('#lastName').type(user.lastName)
  cy.get('#email').type(user.email)
  cy.get('#open-text-area').type('Testando...')

  cy.get('#firstName').should('have.value', user.name)
  cy.get('#lastName').should('have.value', user.lastName)
  cy.get('#email').should('have.value', user.email)
  cy.get('#open-text-area').should('have.value', 'Testando...')

  cy.contains('button', 'Enviar').click()

  cy.get('.success').should('be.visible')
})

