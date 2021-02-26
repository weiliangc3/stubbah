export interface PactStub {
  provider: Provider;
  consumer: Consumer;
  interactions : Interactions[];
  metadata: Record<string, unknown>
}

export interface Provider {
  name: string;
}

export interface Consumer {
  name: string;
}

export interface Interactions {
  description: string;
  provider_state: string;
  request: ExpectedRequest;
  response: ExpectedResponse;
}

export interface ExpectedRequest {
  method: string;
  path: string;
  headers?: Record<string, unknown>;
  body?: any;
}

export interface ExpectedResponse {
  status: number;
  header?: Record<string, unknown>;
  body?: any;
}