import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';

const config = ({
  testDir: '.',
  retries: 1,
  timeout: 90 * 1000,
  expect: {
    timeout: 6 * 1000,
  },
  reporter: 'html',

  projects: [
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 0,
        ignoreHTTPSErrors: true,
        video: { mode: 'retain-on-failure', dir: 'videos' },
        screenshot: { mode: 'only-on-failure', path: 'screenshots' },
        trace: 'retain-on-failure' //'on' // 'off'
      }
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 0,
        ignoreHTTPSErrors: true,
        video: { mode: 'retain-on-failure', dir: 'videos' },
        screenshot: { mode: 'only-on-failure', path: 'screenshots' },
        trace: 'retain-on-failure' //'on' // 'off'
      }

    },
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 0,
        ignoreHTTPSErrors: true,
        video: { mode: 'retain-on-failure', dir: 'videos' },
        screenshot: { mode: 'only-on-failure', path: 'screenshots' },
        trace: 'retain-on-failure' //'on' // 'off'
      },

    },
  ]
});
module.exports = config;