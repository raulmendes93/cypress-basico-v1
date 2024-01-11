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

describe('Libs', function() {

    const { faker } = require('@faker-js/faker');
    const fullName = faker.person.fullName();
    const address = faker.internet.email().toLowerCase();
    const lorem = faker.lorem.text();
    const phone = faker.phone.number();

    Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
        cy.get('#firstName').type(fullName);
        cy.get('#lastName').type('Mendes');
        cy.get('#email').type(address);
        cy.get('#open-text-area').type(lorem, { delay: 0 });
        cy.contains('button', 'Enviar').click()
    })
})