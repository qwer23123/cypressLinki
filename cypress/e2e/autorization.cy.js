/// <reference types="cypress" />
describe(' log in and sing in', () => {
  beforeEach(() => {
    cy.visit('https://linki.group/');
    cy.viewport(1920, 1080)
    cy.wait(500);
  });

  it('Send empty2299 form log in', () => {
    cy.get('.sign-up-btn').click();
    cy.origin('https://linki-group.eu.auth0.com', () => {
      cy.contains('button', 'Продолжить').click();
      cy.get('input[name="username"]').then(($el) => {
        expect($el[0].validationMessage).to.eq('Заполните это поле.');
      });
    });
  });


  it('Log in with empty field password', () => {
    cy.get('.sign-up-btn').click();

    cy.origin('https://linki-group.eu.auth0.com', () => {
      cy.get('input[name="username"]').clear().type('2fexic68934@scarden.com')
          .should('have.value', '2fexic68934@scarden.com');
      cy.contains('button', 'Продолжить').click();
      cy.get('input[name="password"]').then(($el) => {
        expect($el[0].validationMessage).to.eq('Заполните это поле.');
      });
    });
  });
  it('Log in with empty field email', () => {
    cy.get('.sign-up-btn').click();
    cy.origin('https://linki-group.eu.auth0.com', () => {
      cy.get('input[name="password"]').clear().type('Zxcasdqwe123!!')
          .should('have.value', 'Zxcasdqwe123!!');
      cy.contains('button', 'Продолжить').click();
      cy.get('input[name="username"]').then(($el) => {
        expect($el[0].validationMessage).to.eq('Заполните это поле.');
      });
    });
  });
  it('Authorization by a deactivated user', () => {
    cy.get('.sign-up-btn').click();
    cy.origin('https://linki-group.eu.auth0.com', () => {
      cy.get('input[name="password"]').clear().type('Zxcasdqwe123!!')
          .should('have.value', 'Zxcasdqwe123!!');
      cy.get('input[name="username"]').clear().type('1fexic68934@scarden.com')
          .should('have.value', '1fexic68934@scarden.com');
      cy.contains('button', 'Продолжить').click();
    });
    cy.url({timeout: 10000}).should('include', '/dashboard');
    cy.document().its('readyState').should('eq', 'complete');
    cy.wait(1000);
    cy.get('[href="/team-work"] > .navigation-menu__item-text').click();
    cy.wait(1000);
    cy.contains('td', '3d3667fe-e839-4c33-91d4-0e94c1b4c09f')
        .parent()
        .within(() => {
          cy.get('td').contains('Not active').should('be.visible');
        });
  });


  it('successful login', () => {
    cy.get('.sign-up-btn').click();
    cy.origin('https://linki-group.eu.auth0.com', () => {
      cy.get('input[name="password"]').clear().type('Zxcasdqwe123!!')
          .should('have.value', 'Zxcasdqwe123!!');
      cy.get('input[name="username"]').clear().type('2fexic68934@scarden.com')
          .should('have.value', '2fexic68934@scarden.com');
      cy.contains('button', 'Продолжить').click();
    });
    cy.url({timeout: 10000}).should('include', '/dashboard');
    cy.document().its('readyState').should('eq', 'complete');

  });


  it('successful sign up', () => {
    cy.get('.sign-up-btn').click();

    cy.fixture('users').then((users) => {
      const user = users.pop();
      cy.origin('https://linki-group.eu.auth0.com', {args: {user}}, ({user}) => {
        cy.get('.cfb38b06f > .c1273c5d3').click();
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="password"]').type(user.password);
        cy.contains('button', 'Продолжить').click();
      });
      cy.url({timeout: 10000}).should('include', '/dashboard');
      cy.document().its('readyState').should('eq', 'complete');
      cy.writeFile('cypress/fixtures/users.json', users);
    });
  });




});