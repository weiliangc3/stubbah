import Pact from '../../classes/Pact';
import StoredProviderStub from '../../classes/StoredProviderStub';
import PactToLoad from '../../classes/PactToLoad';
import { getLocalPactFiles } from './staticFileLoaderService';
import { addPactInteractionsToProviderStub, getInteractionsForProviderStub } from './pactInteractionsService';
import PactInteraction from '../../classes/PactInteraction';

const providerStubs: Record<string, StoredProviderStub> = {};

const localPacts: PactToLoad[] = getLocalPactFiles();
localPacts.forEach((localPact: PactToLoad) => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  loadPact(localPact.pact, localPact.route);
});

export function getProviderStubMap(): Record<string, StoredProviderStub> {
  return providerStubs;
}

export function getProviderStub(route: string): StoredProviderStub {
  return providerStubs[route];
}

export function removeProviderStub(route: string): Record<string, StoredProviderStub> {
  delete providerStubs[route];
  return providerStubs;
}

export function loadPact(pact: Pact, route: string): boolean {
  const providerStub = getProviderStub(route);
  if (providerStub) {
    if (providerStub.provider !== pact.provider.name) {
      console.log(`Error loading pact for ${route} <-> ${pact.provider}, unmatched provider ${providerStub.provider} found`);
      return false;
    }

    providerStubs[route] = addPactInteractionsToProviderStub(providerStub, pact);

    console.log(`Loaded pact for ${route}`);
    return true;
  }

  const newProviderStub = new StoredProviderStub(pact.provider.name, route);
  providerStubs[route] = addPactInteractionsToProviderStub(newProviderStub, pact);
  return true;
}

export function removeInteractionFromStub(route: string, id: number) {
  const providerStub: StoredProviderStub = getProviderStub(route);
  providerStub.removeInteraction(id);
}

export function addStateForProviderByRoute(state: string, route: string): void {
  const provider: StoredProviderStub = getProviderStub(route);
  if (provider && !provider.activeStates.includes(state)) {
    provider.activeStates.push(state);
  }
}

export function removeStateForProviderByRoute(state: string, route: string): void {
  const provider: StoredProviderStub = getProviderStub(route);
  if (provider) {
    provider.activeStates = provider.activeStates.filter((_state) => _state !== state);
  }
}

export function getPotentialStatesForProvider(route: string): string[] {
  const potentialStates: string[] = [];
  const providerStub = getProviderStub(route);
  const interactions = getInteractionsForProviderStub(providerStub);

  interactions.forEach((interaction) => {
    const state = interaction.providerState;

    if (!potentialStates.includes(state) && !providerStub.activeStates.includes(state)) {
      potentialStates.push(state);
    }
  });
  return potentialStates;
}

export function getProviderStates(route: string): string[] {
  return getProviderStub(route).activeStates;
}

export function getInteractionsForRoute(route: string): PactInteraction[] {
  const providerStub = getProviderStub(route);
  if (!providerStub) { return []; }

  return getInteractionsForProviderStub(providerStub);
}
