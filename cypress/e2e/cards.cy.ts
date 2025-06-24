describe('Fluxo de listagem de empresas e visualização do rendimento', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/companies/cnpj/80499561944830',
      { statusCode: 200, body: { valor_rendimento: 14227467.9818304 } }
    ).as('getYield');
  });

  it('exibe cards, abre modal e mostra rendimento', () => {
    cy.visit('/');

    cy.contains('Caseiro Frutas da Júlia').should('be.visible');

    cy.contains('Caseiro Frutas da Júlia')
      .parents('.styles-module___-xRCW__card')
      .contains(/visualizar rendimento/i)
      .click();

    cy.wait('@getYield');

    cy.contains('Rendimento Atual').should('be.visible');
    cy.contains('R$ 14.227.467,98').should('be.visible');

    cy.contains('Fechar').click();
    cy.contains('Rendimento Atual').should('not.exist');
  });
});
