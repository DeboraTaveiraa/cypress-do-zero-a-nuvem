Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (user = {
  name: 'Débora',
  lastName: 'Taveira',
  email: 'deborataveira.dev@gmail.com'
}) => {
  cy.get('#firstName').type(user.name)
  cy.get('#lastName').type(user.lastName)
  cy.get('#email').type(user.email)
  cy.get('#open-text-area').type('Testando...')

  cy.get('#firstName').should('have.value', user.name)
  cy.get('#lastName').should('have.value', user.lastName)
  cy.get('#email').should('have.value', user.email)
  cy.get('#open-text-area').should('have.value', 'Testando...')

  cy.contains('button[type="submit"]', 'Enviar').click()
})

