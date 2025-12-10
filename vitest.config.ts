import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 20000,
    watch: false,
    globals: true,
    bail: 3,
    retry: 3,
    globalSetup: 'tests/globalSetup.ts',
  },
})