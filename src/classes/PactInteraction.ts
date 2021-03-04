import { PactStubRequest, RawPactInteraction, StubResponse } from './types';

export default class PactInteraction {
  description: string;

  providerState: string;

  request: PactStubRequest;

  response: StubResponse;

  counter: number;

  id: number;

  route: string;

  constructor(id: number, description: string, providerState: string,
    request: PactStubRequest, response: StubResponse, route: string) {
    this.id = id;
    this.description = description;
    this.providerState = providerState;
    this.request = request;
    this.response = response;
    this.route = route;
    this.counter = 0;
  }

  static fromRawPactInteraction(
    rawPactInteraction: RawPactInteraction, id: number, route: string,
  ):PactInteraction {
    return new PactInteraction(
      id,
      rawPactInteraction.description,
      rawPactInteraction.provider_state,
      rawPactInteraction.request,
      rawPactInteraction.response,
      route,
    );
  }

  public incrementCounter(): PactInteraction {
    this.counter += 1;
    return this;
  }
}
