# 🧪 Projeto de Teste — Cadastro e Rendimento de Empresas | Arkmeds  

Este repositório demonstra um fluxo completo de **cadastro, listagem e visualização de rendimento de empresas**, desenvolvido como parte de um **teste técnico da Arkmeds**.

---

## 🚀 Getting Started

```bash
# instalar dependências
npm install

# iniciar servidor de desenvolvimento
npm run dev
A aplicação estará disponível em
http://localhost:3000.

🧠 Decisões Arquiteturais
Tema	Motivação
Next .js	Framework React mais robusto; roteamento e SSR nativos; ótimo para escalar.
Base UI	Biblioteca leve dos criadores do MUI; dá liberdade para customizar sem peso extra.

✏️ UI Design
O layout foi criado no Figma, seguindo a paleta de cores da Arkmeds.

🔗 Figma – Arkmeds ERP
https://www.figma.com/design/8jc4UXSv8H0qXRAg5n4bG7/Arkmeds-ERP?node-id=23-3525&t=TDyjFuUUm7Gl3hhB-1

🛠 Funcionalidades
📋 Cadastro
Validação com React Hook Form + Zod.

Autopreenchimento via CNPJ (Arkmeds) e CEP (ViaCEP).

Máscaras invisíveis (transform) e mensagens de erro amigáveis.

📦 Listagem & Modal
Cards das empresas carregados em SSR.

Busca instantânea por CNPJ, nome fantasia ou razão social.

Modal só consulta rendimento ao abrir, exibindo valor formatado em BRL.

🔍 Busca
Pesquisa única filtra dinamicamente os cards.

Normaliza CNPJ (remove ./-) para facilitar a digitação.

✅ Testes Cypress
Intercepts para CNPJ, CEP, listagem, rendimento e criação.

Pacote @testing-library/cypress para queries semânticas.

Cobertura de sucesso e falha (timeouts, erros 500 etc.).

📁 Estrutura Principal
bash
Copiar
Editar
services/
  ├─ cepService.ts         # ViaCEP
  ├─ cnpjService.ts        # Arkmeds CNPJ
  └─ companyService.ts     # Listagem / rendimento / criação

components/
  ├─ Card.tsx
  ├─ CardDialog.tsx
  └─ Button.tsx

schemas/
  └─ formEmpresasSchema.ts # Zod

utils/
  ├─ formatCEP.ts
  └─ getErrorMessage.ts

cypress/
  ├─ e2e/
  │   └─ card-modal.cy.ts  # fluxo cards + modal
  └─ support/
      └─ e2e.ts            # intercepts globais
🧑‍💻 Autor
Desenvolvido por Vinicius Soares de Almeida (2025) — obrigado pela oportunidade e avaliação!
Sinta-se à vontade para testar, sugerir melhorias ou entrar em contato.
