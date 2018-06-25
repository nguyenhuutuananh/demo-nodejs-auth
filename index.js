const routes = require('./server/routes');
const server = require('./server/server');
server.use('/', routes);