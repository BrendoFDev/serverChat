const { startExpressServer } = require('./src/api/server');
const { startSocketServer } = require('./src/socket/server');

(async function startServers(){

    const {app, sessionConfig} = await startExpressServer();

    startSocketServer(app, sessionConfig);
})();
