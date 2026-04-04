describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Débora')
    cy.get('#lastName').type('Taveira')
    cy.get('#email').type('deborataveira.dev@gmail.com')
    cy.get('#open-text-area').type('Testando...')

    cy.get('#firstName').should('have.value', 'Débora')
    cy.get('#lastName').should('have.value', 'Taveira')
    cy.get('#email').should('have.value', 'deborataveira.dev@gmail.com')
    cy.get('#open-text-area').should('have.value', 'Testando...')

    cy.contains('button[type="submit"]', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('preenche os campos obrigatórios e envia o formulário - textarea com delay 0', () => {
    const longText = Cypress._.repeat('Veniam aliquip commodo commodo eiusmod deserunt non tempor nulla.', 10)

    cy.get('#firstName').type('Débora')
    cy.get('#lastName').type('Taveira')
    cy.get('#email').type('deborataveira.dev@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    
    cy.contains('button[type="submit"]', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Débora')
    cy.get('#lastName').type('Taveira')
    cy.get('#email').type('deborataveira.dev')
    cy.get('#open-text-area').type('Testando...')

    cy.contains('button[type="submit"]', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone permanece vazio ao tentar preencher com valor não numérico', () => {
    cy.get('#phone').type('teste@.com')
    cy.get('#phone').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Débora')
    cy.get('#lastName').type('Taveira')
    cy.get('#email').type('deborataveira.dev@gmail.com')
    cy.get('#open-text-area').type('Testando...')

    cy.get('#phone-checkbox').click()
    cy.contains('button[type="submit"]', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Débora')
    cy.get('#lastName').type('Taveira')
    cy.get('#email').type('deborataveira.dev@gmail.com')
    cy.get('#phone').type('123456')

    cy.get('#firstName').should('have.value', 'Débora')
    cy.get('#lastName').should('have.value', 'Taveira')
    cy.get('#email').should('have.value', 'deborataveira.dev@gmail.com')
    cy.get('#phone').should('have.value', '123456')

    cy.get('#firstName').clear()
    cy.get('#lastName').clear()
    cy.get('#email').clear()
    cy.get('#phone').clear()

    cy.get('#firstName').should('have.value', '')
    cy.get('#lastName').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('#phone').should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button[type="submit"]', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado com usuário default', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado passando dados do usuário', () => {
    cy.fillMandatoryFieldsAndSubmit({
      name: 'Débora',
      lastName: 'Taveira',
      email: 'deborataveira.dev@gmail.com'
    })

    cy.get('.success').should('be.visible')
  })
})