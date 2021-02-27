import {
  Router, Request, Response,
} from 'express';
import bodyParser from 'body-parser';
import {
  addStateForProviderByRoute, getProviderStubByRoute,
  getProviderStubMap, loadPact, removeStateForProviderByRoute,
} from '../../pactStub/pactStubService';
import Pact from '../../../classes/Pact';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(getProviderStubMap());
});

router.post('/:route', bodyParser.json(), (req: Request, res: Response) => {
  let pactStub: Pact;
  const { route } = req.params;
  try {
    const requestBody: any = req.body;
    if (!route) {
      throw new Error();
    }
    pactStub = new Pact(requestBody);
  } catch {
    return res.sendStatus(400);
  }

  loadPact(pactStub, route);
  return res.send(getProviderStubByRoute(route));
});

router.post('/:route/state', bodyParser.text(), (req: Request, res: Response) => {
  const { route } = req.params;
  try {
    if (!route) {
      throw new Error();
    }
  } catch {
    return res.sendStatus(400);
  }

  addStateForProviderByRoute(req.body, route);
  return res.send(getProviderStubByRoute(route));
});

router.delete('/:route/state', bodyParser.text(), (req: Request, res: Response) => {
  const { route } = req.params;
  try {
    if (!route) {
      throw new Error();
    }
  } catch {
    return res.sendStatus(400);
  }

  removeStateForProviderByRoute(req.body, route);
  return res.send(getProviderStubByRoute(route));
});

export default router;
