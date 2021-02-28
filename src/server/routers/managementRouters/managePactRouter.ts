import {
  Router, Request, Response,
} from 'express';
import bodyParser from 'body-parser';
import {
  addStateForProviderByRoute, getProviderStub,
  getProviderStubMap, loadPact, removeInteractionFromStub,
  removeProviderStub, removeStateForProviderByRoute,
} from '../../services/pactStubService';
import Pact from '../../../classes/Pact';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(getProviderStubMap());
});

router.get('/:route', (req: Request, res: Response) => {
  const { route } = req.params;
  res.send(getProviderStub(route));
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
  return res.send(getProviderStub(route));
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
  return res.send(getProviderStub(route));
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
  return res.send(getProviderStub(route));
});

router.delete('/:route/interaction/:id', (req: Request, res: Response) => {
  const { route, id } = req.params;
  try {
    if (!route) {
      throw new Error();
    }
  } catch {
    return res.sendStatus(400);
  }

  removeInteractionFromStub(route, parseInt(id, 10));
  return res.send(getProviderStub(route));
});

router.delete('/:route', (req: Request, res: Response) => {
  const { route } = req.params;
  try {
    if (!route) {
      throw new Error();
    }
  } catch {
    return res.sendStatus(400);
  }

  removeProviderStub(route);
  return res.send(getProviderStub(route));
});

export default router;
