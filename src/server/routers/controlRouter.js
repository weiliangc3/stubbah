import { Router } from 'express';
import { increment } from './counterRouter';

const router = Router();

router.use((req, res, next) => {
  console.log('control called', req.url);
  next();
});

router.get('/increment', (req, res) => {
  increment();
  res.status(200);
  res.send();
});

export default router;
