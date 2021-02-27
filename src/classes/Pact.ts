export default class Pact {
  provider: Provider;

  consumer: Consumer;

  interactions : Interaction[];

  metadata: Record<string, unknown>;

  constructor(jsonInput: any) {
    this.provider = jsonInput.provider;
    this.consumer = jsonInput.consumer;
    this.interactions = jsonInput.interactions;
    this.metadata = jsonInput.metadata;
  }
}

export interface Provider {
  name: string;
}

export interface Consumer {
  name: string;
}

export interface Interaction {
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
