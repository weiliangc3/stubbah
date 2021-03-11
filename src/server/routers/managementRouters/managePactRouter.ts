import {
  Router, Request, Response,
} from 'express';
import bodyParser from 'body-parser';
import {
  addStateForProviderByRoute, getInteractionsForRoute,
  getPotentialStatesForProvider, getProviderStub,
  getProviderStubMap, loadPact, removeInteractionFromStub,
  removeProviderStub, removeStateForProviderByRoute,
} from '../../services/pactStubsService';
import Pact from '../../../classes/Pact';
import { interactionAccessor, statesAccessor, statesAvailableAccessor } from '../../../endpoints/managePactEndpoints';

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
    return res.status(404).send(`No route ${route} found`);
  }

  loadPact(pactStub, route);
  return res.send(getProviderStub(route));
});

router.get(`/:route/${statesAccessor}/${statesAvailableAccessor}`, (req: Request, res: Response) => {
  const { route } = req.params;
  try {
    if (!route) {
      throw new Error();
    }
  } catch {
    return res.status(404).send(`No route ${route} found`);
  }

  return res.send(getPotentialStatesForProvider(route));
});

router.post(`/:route/${statesAccessor}`, bodyParser.json(), (req: Request, res: Response) => {
  const { route } = req.params;
  try {
    if (!route) {
      throw new Error();
    }
  } catch {
    return res.status(404).send(`No route ${route} found`);
  }

  addStateForProviderByRoute(req.body.state, route);
  return res.send(getProviderStub(route));
});

router.delete(`/:route/${statesAccessor}`, bodyParser.json(), (req: Request, res: Response) => {
  const { route } = req.params;
  try {
    if (!route) {
      throw new Error();
    }
  } catch {
    return res.status(404).send(`No route ${route} found`);
  }

  removeStateForProviderByRoute(req.body.state, route);
  return res.send(getProviderStub(route));
});

router.delete(`/:route/${interactionAccessor}/:id`, (req: Request, res: Response) => {
  const { route, id } = req.params;
  try {
    if (!route) {
      throw new Error();
    }
  } catch {
    return res.status(404).send(`No route ${route} found`);
  }

  removeInteractionFromStub(route, parseInt(id, 10));
  return res.send(getProviderStub(route));
});

router.get(`/:route/${interactionAccessor}`, (req: Request, res: Response) => {
  const { route } = req.params;
  return res.send(getInteractionsForRoute(route));
});

router.delete('/:route', (req: Request, res: Response) => {
  const { route } = req.params;
  try {
    if (!route) {
      throw new Error();
    }
  } catch {
    return res.status(404).send(`No route ${route} found`);
  }

  removeProviderStub(route);
  return res.send(getProviderStub(route));
});

export default router;
