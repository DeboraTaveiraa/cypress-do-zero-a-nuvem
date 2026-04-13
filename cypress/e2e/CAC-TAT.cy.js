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

    cy.get('#phone-checkbox').check()
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

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check()
    cy.get('input[type="radio"][value="feedback"]').should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each((inputOfService) => {
      cy.wrap(inputOfService).check()
      cy.wrap(inputOfService).should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').as('checkboxes')

    cy.get('@checkboxes')
      .check()
      .should('be.checked')

    cy.get('@checkboxes')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('fileJson')
    
    cy.get('#file-upload')
      .selectFile('@fileJson', { action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })
})