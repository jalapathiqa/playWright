import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';
import { permission } from 'process';

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
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 0,
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'on',
        screenshot: { mode: 'only-on-failure', path: 'screenshots' },
        trace: 'retain-on-failure', //'on' // 'off',
        ...devices['iPhone 15']
      }
    },
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 0,
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'on',
        screenshot: { mode: 'only-on-failure', path: 'screenshots' },
        trace: 'retain-on-failure', //'on' // 'off'
        ...devices['Samsung Galaxy S10']
      }

    },
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 0,
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'on',
        screenshot: { mode: 'only-on-failure', path: 'screenshots' },
        trace: 'retain-on-failure', //'on' // 'off'
        ...devices['Pixel 5']
      },

    },
  ]
});
module.exports = config;