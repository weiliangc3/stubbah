import express from 'express';
import https from 'https';
import fs from 'fs';
import { argv } from 'yargs';
import controlRouter from './routers/controlRouter';
import counterRouter from './routers/counterRouter';
import pactStubRouter from './routers/pactStubRouter';
import fallbackHandler from './fallbackHandler';

const app = express();

const httpsEnabled = argv.https || false;
const portNumber = argv.port || 3000;

app.use('/control', controlRouter);
app.use('/counter', counterRouter);
app.use('/pact-stub', pactStubRouter);

app.use('*', fallbackHandler);

if (httpsEnabled) {
  https.createServer({
    key: fs.readFileSync('./config/server.key'),
    cert: fs.readFileSync('./config/server.cert'),
  }, app)
    .listen(portNumber, () => { console.log(`HTTPS Server started and listening on port ${portNumber}`); });
} else {
  app.listen(portNumber, () => { console.log(`HTTP Server started and listening on port ${portNumber}`); });
}

export default app;
