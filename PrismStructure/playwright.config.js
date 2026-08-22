// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Env vars (set these in a .env you create locally — do NOT commit real secrets):
 * UI_BASE_URL   - default https://practicesoftwaretesting.com
 * API_BASE_URL  - default https://api.practicesoftwaretesting.com
 */
const UI_BASE_URL = process.env.UI_BASE_URL || 'https://practicesoftwaretesting.com';
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.practicesoftwaretesting.com';

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: false, // Toolshop shares a demo DB — avoid cross-test collisions
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['html', { outputFolder: 'execution-report/html-report', open: 'never' }],
    ['json', { outputFile: 'execution-report/results.json' }],
    ['list'],
  ],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: UI_BASE_URL },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: API_BASE_URL },
    },
  ],
});
