import { defineConfig, devices } from '@playwright/test';

const config = ({
  testDir: './tests',
  retries: 0, // retry the test if it fails
  workers: 5, // run all test in parallel
  fullyParallel: true, // run all test in parallel
  timeout: 90 * 1000,
  expect: {
    timeout: 6 * 1000,
  },
  reporter: [['html'], ['line'], ['allure-playwright']],

  use: {
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    permissions: ['geolocation'],
    video: { mode: 'retain-on-failure', dir: 'videos' },
    screenshot: { mode: 'only-on-failure', path: 'screenshots' },
    trace: 'on', //'retain-on-failure' // 'off'
    //launchOptions: {
    //  args: ['--start-maximized']
    //}
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth.setup.ts/,
    },
    {
      name: 'default',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],

});
module.exports = config;