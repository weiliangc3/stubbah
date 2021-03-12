import {
  Router, Request, Response,
} from 'express';
import bodyParser from 'body-parser';
import {
  getProvider, getProviders, getStubsForRoute, loadStub,
  removeStubFromProvider, removeProvider, addStateForProviderByRoute,
  removeStateForProviderByRoute, getPotentialStatesForProvider,
} from '../../services/genericProvidersService';
import GenericStub from '../../../classes/GenericStub';
import { statesAccessor, statesAvailableAccessor, stubsAccessor } from '../../../endpoints/manageStubEndpoints';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(getProviders());
});

router.get('/:route', (req: Request, res: Response) => {
  const { route } = req.params;
  res.send(getProvider(route));
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

  return res.send(removeProvider(route));
});

router.post(`/:route/${stubsAccessor}`, bodyParser.json(), (req: Request, res: Response) => {
  let stub: GenericStub;
  const { route } = req.params;
  try {
    if (!route) {
      return res.status(404).send('No route provided');
    }
    stub = req.body;
  } catch {
    return res.status(400).send('Stub format is invalid');
  }

  if (!stub.name) { stub.name = 'From API (no name)'; }
  loadStub(stub, route);
  return res.send(getProvider(route));
});

router.get(`/:route/${stubsAccessor}`, (req: Request, res: Response) => {
  const { route } = req.params;
  return res.send(getStubsForRoute(route));
});

router.delete(`/:route/${stubsAccessor}/:id`, (req: Request, res: Response) => {
  const { route, id } = req.params;
  try {
    if (!route) {
      throw new Error();
    }
  } catch {
    return res.status(404).send(`No route ${route} found`);
  }

  removeStubFromProvider(route, parseInt(id, 10));
  return res.send(getProvider(route));
});

// State endpoints

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
  return res.send(getProvider(route));
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
  return res.send(getProvider(route));
});

router.get(`/:route/${statesAccessor}/${statesAvailableAccessor}`, (
  req: Request, res: Response,
) => {
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

export default router;
