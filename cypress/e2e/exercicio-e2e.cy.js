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

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    cy.fixture('Perfil').then(dados => {
      cy.get('#username').type(dados.usuario);
      cy.get('#password').type(dados.senha, { log: false });
      cy.get('.woocommerce-form > .button').click();
      cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá,');
    });

    cy.fixture('produtos').then(dados => {
      PesquisarPage.buscarProduto(dados[0].nomeProduto);
      PesquisarPage.addProdutoCarrinho(
        dados[0].tamanho,
        dados[0].cor,
        dados[0].quantidade
      );
      cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto);

      PesquisarPage.buscarProduto(dados[1].nomeProduto);
      PesquisarPage.addProdutoCarrinho(
        dados[1].tamanho,
        dados[1].cor,
        dados[1].quantidade
      );
      cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto);

      PesquisarPage.buscarProduto(dados[2].nomeProduto);
      PesquisarPage.addProdutoCarrinho(
        dados[2].tamanho,
        dados[2].cor,
        dados[2].quantidade
      );
      cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto);

      PesquisarPage.buscarProduto(dados[3].nomeProduto);
      PesquisarPage.addProdutoCarrinho(
        dados[3].tamanho,
        dados[3].cor,
        dados[3].quantidade
      );
      cy.get('.woocommerce-message').should('contain', dados[3].nomeProduto);
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
      '11 954739281'
    );
    cy.wait(5000);
    cy.get('.woocommerce-order-details__title').should('contain', 'Detalhes do pedido');
  });
});
