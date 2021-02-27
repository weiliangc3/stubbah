import fs from 'fs';
import Pact from '../../classes/Pact';
import StoredProviderStub from '../../classes/StoredProviderStub';

const providerStubs: Record<string, StoredProviderStub> = {};

// eslint-disable-next-line @typescript-eslint/no-use-before-define
loadLocalPactStubFiles();

function getProviderStubMap(): Record<string, StoredProviderStub> {
  return providerStubs;
}

function getProviderStubByRoute(route: string): StoredProviderStub {
  return providerStubs[route];
}

function loadPact(pact: Pact, route: string): boolean {
  const providerStub = getProviderStubByRoute(route);
  if (providerStub) {
    if (providerStub.provider !== pact.provider.name) {
      console.log(`Error loading pact for ${route} <-> ${pact.provider}, unmatched provider ${providerStub.provider} found`);
      return false;
    }

    pact.interactions.forEach((interaction) => {
      providerStub.addInteraction(interaction);
    });
    console.log(`Loaded pact for ${route}`);
    return true;
  }

  providerStubs[route] = new StoredProviderStub(pact.provider.name, pact.interactions);
  return true;
}

function addStateForProviderByRoute(state: string, route: string): void {
  const provider: StoredProviderStub = getProviderStubByRoute(route);
  if (provider && !provider.activeStates.includes(state)) {
    provider.activeStates.push(state);
  }
}

function removeStateForProviderByRoute(state: string, route: string): void {
  const provider: StoredProviderStub = getProviderStubByRoute(route);
  if (provider) {
    provider.activeStates = provider.activeStates.filter((_state) => _state !== state);
  }
}

function getPotentialStatesForProvider(route: string): string[] {
  const potentialStates: string[] = [];
  const providerStub = getProviderStubByRoute(route);

  providerStub.interactions.forEach((interactionId) => {
    const state = providerStub.interactionMap[interactionId].provider_state;

    if (!potentialStates.includes(state)) {
      potentialStates.push();
    }
  });
  return potentialStates;
}

function loadLocalPactStubFiles(): void {
  fs.readFile('stubs/sample.json', (err, data) => {
    if (err) throw err;
    const pact: Pact = new Pact(JSON.parse(data.toString()));

    // dummy data
    loadPact(pact, 'zoo');
  });
}

function getProviderStates(route: string): string[] {
  return getProviderStubByRoute(route).activeStates;
}

export {
  getProviderStubMap, getProviderStubByRoute,
  loadPact, addStateForProviderByRoute,
  getProviderStates, getPotentialStatesForProvider,
  removeStateForProviderByRoute,
};
