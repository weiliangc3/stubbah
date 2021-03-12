import {
  Router, Request, Response,
} from 'express';
import { requestsAccessor } from '../../../endpoints/manageEndpoints';
import { pactsAccessor } from '../../../endpoints/managePactEndpoints';
import { stubsProviderAccessor } from '../../../endpoints/manageStubEndpoints';
import { getAllRequestRecords } from '../../services/requestMatcherService';
import managePactRouter from './managePactRouter';
import manageGenericStubRouter from './manageGenericStubRouter';

const router: Router = Router();

router.use(`/${pactsAccessor}`, managePactRouter);
router.use(`/${stubsProviderAccessor}`, manageGenericStubRouter);

router.get(`/${requestsAccessor}`, (req: Request, res: Response) => {
  res.send(getAllRequestRecords());
});

export default router;
