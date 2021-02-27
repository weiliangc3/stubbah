import express from 'express';
import printReq from './utils/printReq';

export default (req: express.Request, res: express.Response): void => {
  printReq(req);
  res.status(404);
  res.send();
};
