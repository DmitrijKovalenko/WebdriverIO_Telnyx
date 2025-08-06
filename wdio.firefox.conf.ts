import { config as baseConfig } from './wdio.conf.ts';

export const config = {
  ...baseConfig,
  capabilities: [{
    maxInstances: 5,
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: [
        '-headless',
        '--width=1920',
        '--height=1080'],
    },
  }],
};