import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://gorest.co.in",
    env: {
      API_TOKEN:
        "655f7483529e4b3358ef290c37230294f2952a0804136a5ab8da9f90f9b26c62",
      TEST_USER_ID: "7572635",
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
