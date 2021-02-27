import fs from 'fs';
import Pact from '../../classes/Pact';
import StoredProviderStub from '../../classes/StoredProviderStub';

const providerStubs: Record<string, StoredProviderStub> = {};

// eslint-disable-next-line @typescript-eslint/no-use-before-define
loadLocalPactStubFiles();

function getProviderStubMap(): Record<string, StoredProviderStub> {
  return providerStubs;
}

function getProviderStub(route: string): StoredProviderStub {
  return providerStubs[route];
}

function removeProviderStub(route: string): Record<string, StoredProviderStub> {
  delete providerStubs[route];
  return providerStubs;
}

function loadPact(pact: Pact, route: string): boolean {
  const providerStub = getProviderStub(route);
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

function removeInteractionFromStub(route: string, id: number) {
  const providerStub: StoredProviderStub = getProviderStub(route);
  providerStub.removeInteraction(id);
}

function addStateForProviderByRoute(state: string, route: string): void {
  const provider: StoredProviderStub = getProviderStub(route);
  if (provider && !provider.activeStates.includes(state)) {
    provider.activeStates.push(state);
  }
}

function removeStateForProviderByRoute(state: string, route: string): void {
  const provider: StoredProviderStub = getProviderStub(route);
  if (provider) {
    provider.activeStates = provider.activeStates.filter((_state) => _state !== state);
  }
}

function getPotentialStatesForProvider(route: string): string[] {
  const potentialStates: string[] = [];
  const providerStub = getProviderStub(route);

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
  return getProviderStub(route).activeStates;
}

function matchRequestToPact(route: string, URI: string, method: string) {
  const providerStub = getProviderStub(route);

  if (providerStub) {
    const pathRegex = new RegExp(`${route}/(.+)`);
    const regexArray = pathRegex.exec(URI);
    const path = `/${regexArray ? regexArray[1] : ''}`;

    const providerInteractions = providerStub.getAllInteractions();
    const providerActiveStates = providerStub.activeStates;

    const matchingInteractions = providerInteractions
      .filter((interaction) => interaction.request.path === path
        && interaction.request.method.toLowerCase() === method
        && providerActiveStates.includes(interaction.provider_state));

    if (matchingInteractions.length > 0) {
      console.log(`Provider interactions matched with ${matchingInteractions.length} pact(s)`);
      return matchingInteractions[0].response;
    }
  }
  return null;
}

export {
  getProviderStubMap, getProviderStub,
  loadPact, addStateForProviderByRoute,
  getProviderStates, getPotentialStatesForProvider,
  removeStateForProviderByRoute, removeInteractionFromStub,
  removeProviderStub, matchRequestToPact,
};
