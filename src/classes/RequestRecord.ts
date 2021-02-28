import { Request } from 'express';
import { StubResponse } from './types';

export default class RequestRecord {
  request: Request;

  matched: boolean;

  response: StubResponse|null;

  constructor(request: Request, response: StubResponse|null = null) {
    this.request = request;
    if (response) {
      this.matched = true;
      this.response = response;
    } else {
      this.matched = false;
      this.response = null;
    }
  }
}
