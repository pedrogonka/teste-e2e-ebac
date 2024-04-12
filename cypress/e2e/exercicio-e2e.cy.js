/// <reference types="cypress" />
import PesquisarPage from "../support/page_objects/Pesquisar.page";
import { faker } from '@faker-js/faker'; 

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
    cy.visit('/minha-conta/');
  });

  beforeEach(() => {
    cy.visit('/minha-conta/');
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    cy.fixture('Perfil').then(dados => {
      cy.get('#username').type(dados.usuario);
      cy.get('#password').type(dados.senha, {log: false});
      cy.get('.woocommerce-form > .button').click();
      cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá,');

      cy.fixture('produtos').then(produtos => {
        for (let i = 0; i < produtos.length; i++) {
          const produto = produtos[i];
          PesquisarPage.buscarProduto(produto.nomeProduto);
          PesquisarPage.addProdutoCarrinho(
            produto.tamanho, 
            produto.cor, 
            produto.quantidade
          );
          cy.get('.woocommerce-message').should('contain', produto.nomeProduto);
        }
      });

      cy.get('.woocommerce-message > .button').click();
      cy.get('.checkout-button').click();

      cy.preencherDados(
        faker.person.firstName(), 
        faker.person.lastName(),
        faker.location.streetAddress(),
        faker.location.secondaryAddress(),
        faker.location.city(),
        '13221510',
        '11 954739281',
      )
    cy.wait(5000)
    cy.get('.woocommerce-order-details__title').should('contain', 'Detalhes do pedido')

    });
  });
});