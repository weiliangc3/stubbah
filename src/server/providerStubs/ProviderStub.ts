import { Interactions } from '../types/pactTypes';

export default class ProviderStub {
  provider: string;

  interactions : Interactions[];

  activeStates: string[];

  constructor(provider: string, interactions: Interactions[]) {
    this.provider = provider;
    this.interactions = interactions;
    this.activeStates = [];
  }
}
