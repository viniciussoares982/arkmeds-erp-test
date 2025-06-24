import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      ARK_TOKEN: process.env.ARKMEDS_TOKEN,
    },
    viewportWidth: 1200,
    viewportHeight: 800,
  },
});
