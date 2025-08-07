import { config as baseConfig } from './wdio.conf.ts';

export const config = {
  ...baseConfig,
  capabilities: [{
    maxInstances: 1,
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: [
        '-headless',
     //   '--start-maximized'
      '--window-size=1920,1080',
      ],
    },
  }],
};