import { PactConsumer, PactProvider } from './types';
import PactInteraction from './PactInteraction';

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
