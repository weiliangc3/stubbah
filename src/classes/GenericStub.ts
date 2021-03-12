import { Matcher, StubResponse } from './types';

export default class GenericStub {
  requestMatchers: Matcher[];

  response: StubResponse;

  id: number;

  route: string;

  counter: number;

  name: string = 'Unknown';

  providerState?: string;

  constructor(route:string, id: number, requestMatcher: Matcher[], response: StubResponse) {
    this.requestMatchers = requestMatcher;
    this.response = response;
    this.id = id;
    this.route = route;
    this.counter = 0;
  }

  public incrementCounter(): GenericStub {
    this.counter += 1;
    return this;
  }
}
