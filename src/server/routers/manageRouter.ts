import express, { Router } from 'express';
import path from 'path';

const router: express.Router = Router();

router.get('*', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(`${__dirname}../../fe/index.html`));
});

export default router;
