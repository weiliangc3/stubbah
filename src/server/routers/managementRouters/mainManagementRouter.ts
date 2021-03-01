import {
  Router, Request, Response,
} from 'express';
import { requestsAccessor } from '../../../endpoints/manageEndpoints';
import { pactsAccessor } from '../../../endpoints/managePactEndpoints';
import { getAllRequestRecords } from '../../services/requestMatcherService';
import managePactRouter from './managePactRouter';

const router: Router = Router();

router.use(`/${pactsAccessor}`, managePactRouter);

router.get(`/${requestsAccessor}`, (req: Request, res: Response) => {
  res.send(getAllRequestRecords());
});

export default router;
