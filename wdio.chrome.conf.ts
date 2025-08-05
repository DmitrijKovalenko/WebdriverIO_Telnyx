import { config } from './wdio.conf.ts';

export const chromeConfig = {
  ...config,
  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--headless=new',
        '--window-size=1920,1080',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
      ],
    },
  }],
};