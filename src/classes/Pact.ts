import { PactConsumer, PactInteraction, PactProvider } from './types';

export default class Pact {
  provider: PactProvider;

  consumer: PactConsumer;

  interactions : PactInteraction[];

  metadata: Record<string, unknown>;

  constructor(jsonInput: any) {
    this.provider = jsonInput.provider;
    this.consumer = jsonInput.consumer;
    this.interactions = jsonInput.interactions;
    this.metadata = jsonInput.metadata;
  }
}
