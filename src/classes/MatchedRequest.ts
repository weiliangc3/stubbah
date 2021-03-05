import { Request } from 'express';

export default class MatchedRequest {
  body: any;

  method: string;

  headers: Record<string, string | string[] | undefined >;

  url: string;

  time: Date;

  constructor(req: Request) {
    this.body = req.body;
    this.method = req.method;
    this.headers = req.headers;
    this.url = req.originalUrl;
    this.time = new Date();
  }
}
