/* eslint-disable no-prototype-builtins */
import { Router } from 'express';
import { getProviderStub, matchRequestToPact } from '../services/pactStubService';
import emulateResponse from '../utils/emulateResponse';

const router = Router();

router.use((req, res, next) => {
  console.log(`Matching request: ${req.method} to ${req.originalUrl}`);
  next();
});

router.get('*', (req, res) => {
  const uri = req.url;
  const route = uri.split(/\//)[1];
  const method = req.method.toLowerCase();

  const matchedResponse = matchRequestToPact(route, uri, method);

  if (matchedResponse) {
    return emulateResponse(matchedResponse, res);
  }

  console.log(`Request unmatched: ${req.method} to ${req.originalUrl}`);
  return res
    .status(404)
    .send('No matched stubs');
});

export default router;
