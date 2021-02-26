import { Router } from 'express';

const router = Router();

let count = 0;

router.use((req, res, next) => {
  console.log('test called', req.url);
  next();
});

router.get('/count', (req, res) => {
  res.status(200);
  res.send(`count is at ${count}`);
});

function increment() {
  count += 1;
}

export default router;

export { increment };
