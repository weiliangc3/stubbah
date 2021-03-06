export interface PactProvider {
  name: string;
}

export interface PactConsumer {
  name: string;
}

export interface PactStubRequest {
  method: string;
  path: string;
  headers?: Record<string, string>;
  body?: any;
}

export interface StubResponse {
  status: number;
  header?: Record<string, string>;
  body?: any;
}

export enum MatchType {
  Pact = 'pact',
  Generic = 'generic',
}

export interface RawPactInteraction {
  description: string;
  provider_state: string;
  request: PactStubRequest;
  response: StubResponse;
}

export interface Matcher {
  type: string;
  value?: string;
  matcher?: string;
  headers?: Record<string, string>;
}
