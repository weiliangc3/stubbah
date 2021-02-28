import express from 'express';
import { StubResponse } from '../../classes/types';

export default (responseToEmulate: StubResponse, res: express.Response): void => {
  res
    .status(responseToEmulate.status)
    .set(responseToEmulate.header)
    .send(responseToEmulate.body);
};
