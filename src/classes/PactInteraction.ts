import { PactStubRequest, StubResponse } from './types';

export default class PactInteraction {
  description: string;

  provider_state: string;

  request: PactStubRequest;

  response: StubResponse;

  constructor(description: string, providerState: string,
    request: PactStubRequest, response: StubResponse) {
    this.description = description;
    this.provider_state = providerState;
    this.request = request;
    this.response = response;
  }
}
