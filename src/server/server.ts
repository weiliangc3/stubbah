import express from 'express';
import https from 'https';
import fs from 'fs';
import { argv } from 'yargs';
import path from 'path';
import manageApiRouter from './routers/manageApiRouter';
import manageRouter from './routers/manageRouter';
import counterRouter from './routers/counterRouter';
import pactStubRouter from './routers/pactStubRouter';
import fallbackHandler from './fallbackHandler';

const app = express();

const httpsEnabled = argv.https || false;
const portNumber = argv.port || 3000;

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.get('/', (req, res) => {
  res.redirect('/manage');
});
app.use('/manage', manageRouter);
app.use('/manage-api', manageApiRouter);
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
