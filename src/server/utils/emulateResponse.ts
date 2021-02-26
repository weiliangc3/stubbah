import express from 'express';
import { ExpectedResponse } from '../types/pactTypes';

export default (responseToEmulate: ExpectedResponse, res: express.Response): void => {
  res
    .status(responseToEmulate.status)
    .set(responseToEmulate.header)
    .send(responseToEmulate.body);
}