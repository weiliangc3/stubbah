import { Request } from 'express';

export function getRouteFromBaseUrl(req: Request): string {
  return req.baseUrl.split(/\//)[2];
}

export function getStubPathForMatching(req: Request, route: string): string {
  const pathRegex = new RegExp(`/stub/${route}/(.+)`);
  const regexArray = pathRegex.exec(req.baseUrl);
  return `/${regexArray ? regexArray[1] : ''}`;
}
