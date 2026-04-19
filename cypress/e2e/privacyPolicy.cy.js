describe('Página de Política de privacidade', () => {
  beforeEach(() => {
    cy.visit('./src/privacy.html')
  })

   it('verifica o título da página', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })

  it('verifica o texto do h1', () => {
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
})