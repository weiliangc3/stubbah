import express, { Router } from 'express';
import { increment } from './counterRouter';

const router: express.Router = Router();

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('control called', req.url);
  next();
});

router.get('/increment', (req: express.Request, res: express.Response) => {
  increment();
  res.status(200);
  res.send();
});

export default router;
