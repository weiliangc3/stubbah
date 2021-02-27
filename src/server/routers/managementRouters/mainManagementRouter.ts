import {
  Router,
} from 'express';
import managePactRouter from './managePactRouter';

const router: Router = Router();

router.use('/pact', managePactRouter);

export default router;
