const App = require('./src/Application');
const debug = require('./utils/debug')('app', 2);

const app = App();
debug('app inited.');

module.exports = app;