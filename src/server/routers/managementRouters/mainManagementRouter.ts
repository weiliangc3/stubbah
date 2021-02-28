import {
  Router, Request, Response,
} from 'express';
import { getAllRequestRecords } from '../../services/requestMatcherService';
import managePactRouter from './managePactRouter';

const router: Router = Router();

router.use('/pact', managePactRouter);

router.get('/requests', (req: Request, res: Response) => {
  res.send(getAllRequestRecords());
});

export default router;
