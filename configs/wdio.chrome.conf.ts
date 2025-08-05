const baseChrome = require('./wdio.baseChrome.conf.ts');
exports.config = {
  ...baseChrome.config,
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless', '--disable-gpu', '--window-size=1920,1080']
    }
  }]
};