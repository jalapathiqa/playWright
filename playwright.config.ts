import { defineConfig, devices } from '@playwright/test';

const config=({
  testDir: './tests',
  timeout: 90 * 1000,
  expect: {
    timeout: 6 * 1000,
  },
reporter:'html',

  use: {
   browserName:'firefox',
   headless: false,
   viewport: { width: 1280, height: 720 },
   actionTimeout: 0,
   ignoreHTTPSErrors: true,
   video: 'on',
  },
    
});
module.exports=config;