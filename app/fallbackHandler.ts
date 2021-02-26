import printReq from './utils/printReq';
import express from 'express';

export default (req: express.Request, res: express.Response): void => {
  printReq(req);
  res.status(404);
  res.send();
};
