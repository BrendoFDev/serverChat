const { startExpressServer } = require('./src/api/server');
const { startSocketServer } = require('./src/socket/server');

(async function startServers(){

    const appExpress = await startExpressServer();

    startSocketServer(appExpress);
})();
