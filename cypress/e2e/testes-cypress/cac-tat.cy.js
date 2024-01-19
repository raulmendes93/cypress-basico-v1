/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

  const { faker } = require('@faker-js/faker');
  const fullName = faker.person.fullName();
  const address = faker.internet.email().toLowerCase();
  const lorem = faker.lorem.text();
  const phone = faker.phone.number();

  beforeEach(function(){
      cy.viewport(1280, 880);
      cy.visit('./src/index.html');
  })

    it('verifica o título da aplicação', function() {

      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');

    })

    // Exercício extra 1

    it('preenche os campos obrigatórios e envia o formulário', function() {

      cy.get('#firstName').type(fullName);
      cy.get('#lastName').type('Mendes');
      cy.get('#email').type(address);
      cy.get('#open-text-area').type(lorem, { delay: 0 });
      cy.contains('button', 'Enviar').click()
      cy.get('.success').should('be.visible');

    })

      // Exercício extra 2

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

      cy.get('#firstName').type(fullName);
      cy.get('#lastName').type('Mendes');
      cy.get('#email').type('email@.com');
      cy.get('#open-text-area').type(lorem, { delay: 0 });
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')

    })

      // Exercício extra 3

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
      cy.get('#phone')
        .type(fullName)
        .should('have.value', '')
    })

    // Exercício extra 4

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {

      cy.get('#firstName').type(address);
      cy.get('#lastName').type('Mendes');
      cy.get('#email').type(address);
      cy.get('#phone-checkbox').check();
      cy.get('#open-text-area').type(lorem, { delay: 0 });
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')

    })

    // Exercício extra 5

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){

      cy.get('#firstName').type(fullName)
        .should('have.value', (fullName))
        .clear()
        .should('have.value', '')
      cy.get('#lastName').type('Mendes')
        .should('have.value', 'Mendes')
        .clear()
        .should('have.value', '')
      cy.get('#email').type(address)
        .should('have.value', (address))
        .clear()
        .should('have.value', '')
      cy.get('#phone').type('1234567890')
        .should('have.value', ('1234567890'))
        .clear()
        .should('have.value', '')

    })

    // Exercício extra 6

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function(){

      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')

    })

    // Exercício extra 7

    it('envia o formuário com sucesso usando um comando customizado', function(){

      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
      
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
      cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
      cy.get('#product').select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
      cy.get('#product').select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
      cy.get('input[type="radio"][value="feedback"]').check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio)  {
          cy.wrap($radio).check()
          cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
      cy.get('input[type="checkbox"]').check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
      cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
      .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
      })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"')
        .selectFile('@sampleFile')
        .should(function($input){
          expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
      cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
      cy.get('#privacy a').invoke('removeAttr', 'target').click()
    })

    it('preenche a area de texto usando o comando invoke', function() {
      cy.get('#open-text-area')
        .invoke('val', lorem)
        .should('have.value', lorem)
    })

    it('faz uma requisição HTTP', function() {
      cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response) {
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
    })

    it.only('encontre o gato', function() {
      cy.get('#cat')
        .invoke('show')
        .should('be.visible')
    })
})