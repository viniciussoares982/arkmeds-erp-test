import '@testing-library/cypress/add-commands';

beforeEach(() => {
  /* --- ViaCEP (qualquer CEP de 8 dígitos) -------------------------- */
  cy.intercept(
    'GET',
    'https://viacep.com.br/ws/30411040/json/',
    { fixture: 'via_cep_ok.json' }    // ← resposta que você quer
  ).as('viaCep');

  /* --- Arkmeds: POST /cnpj ---------------------------------------- */
  cy.intercept(
    'POST',
    '**/cnpj',
    { fixture: 'ark_cnpj_ok.json' },
  ).as('postCnpj');

  /* --- Arkmeds: GET /companies/ (listagem) ------------------------ */
  cy.intercept(
    'GET',
    '**/companies/',
    { fixture: 'list_companies.json' },
  ).as('getCompanies');

  /* --- Arkmeds: GET /companies/cnpj/:id (rendimento) -------------- */
  cy.intercept(
    { method: 'GET', url: /\/companies\/cnpj\/\d{14}$/ },
    { fixture: 'company_yield_ok.json' },
  ).as('getYield');

  /* --- Arkmeds: POST /companies (criação) ------------------------- */
  cy.intercept(
    'POST',
    '**/companies',
    { statusCode: 200, body: {} },
  ).as('createCompany');
});
