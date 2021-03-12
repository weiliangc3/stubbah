import { PactConsumer, PactProvider, RawPactInteraction } from './types';

export default class RawPact {
  provider: PactProvider;

  consumer: PactConsumer;

  interactions : RawPactInteraction[];

  metadata: Record<string, unknown>;

  constructor(jsonInput: any) {
    this.provider = jsonInput.provider;
    this.consumer = jsonInput.consumer;
    this.interactions = jsonInput.interactions;
    this.metadata = jsonInput.metadata;
  }
}
