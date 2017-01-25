const projectPath = process.cwd(),
  testTools = require('we-test-tools'),
  path = require('path');

let we;

// prepare
before(function(callback) {
  testTools.copyLocalConfigIfNotExitst(projectPath, callback);
});

// bootstrap
before(function(callback) {
  this.slow(100);

  const We = require('we-core');
  we = new We();

  testTools.init({}, we);

  we.bootstrap({
    i18n: {
      directory: path.join(__dirname, 'locales'),
      updateFiles: true
    }
  }, callback);
});

// start server
before(function(callback) {
  we.startServer(callback);
});

//after all tests
after(function (callback) {
  testTools.helpers.resetDatabase(we, callback);
});

after(function (callback) {
  we.exit(callback);
});