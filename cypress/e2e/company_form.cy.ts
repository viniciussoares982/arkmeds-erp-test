// cypress/e2e/cadastro_empresa.cy.ts
describe('Fluxo de cadastro de empresa (totalmente mockado)', () => {
  it('deve preencher dados automáticos e enviar com sucesso', () => {
    cy.visit('/cadastro-de-empresas');

    cy.findByPlaceholderText(/CNPJ/i).type('09562222000172');
    cy.wait('@postCnpj');

    cy.findByPlaceholderText(/CEP/i).type('30411-040');
    cy.wait('@viaCep');

    cy.contains(/enviar/i).click();
    cy.wait('@createCompany').its('request.body').should('include', {
      razaoSocial: 'UNIAO GERAL DOS TRABALHADORES DO ESTADO DE MINAS GERAIS',
    });

    cy.contains(/empresa cadastrada com sucesso/i).should('be.visible');
  });
});
