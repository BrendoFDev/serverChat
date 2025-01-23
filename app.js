const { startExpressServer } = require('./src/api/server');
const { startSocketServer } = require('./src/socket/server');

(async function startServers(){

    const {app, session} = await startExpressServer();

    startSocketServer(app, session);
})();
