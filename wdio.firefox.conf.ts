import { config } from './wdio.conf.ts';

export const firefoxConfig = {
  ...config,
  capabilities: [{
    maxInstances: 5,
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: ['-headless', '--width=1920', '--height=1080'],
    },
  }],
};