const baseFirefox = require('./wdio.baseFirefox.conf.ts');
exports.config = {
  ...baseFirefox.config,
  capabilities: [{
    maxInstances: 1,
    browserName: 'firefox',
    'moz:firefoxOptions': {
      args: ['-headless']
    }
  }]
};
