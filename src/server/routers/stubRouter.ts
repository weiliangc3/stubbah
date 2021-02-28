/* eslint-disable no-prototype-builtins */
import {
  NextFunction, Request, Response, Router,
} from 'express';
import { matchRequestToStub } from '../services/requestMatcherService';
import emulateResponse from '../utils/emulateResponse';

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Matching request: ${req.method} to ${req.originalUrl}`);
  next();
});

router.get('*', (req: Request, res: Response) => {
  const matchedResponse = matchRequestToStub(req);

  if (matchedResponse) {
    return emulateResponse(matchedResponse, res);
  }

  console.log(`Request unmatched: ${req.method} to ${req.originalUrl}`);
  return res
    .status(404)
    .send('No matched stubs');
});

export default router;
