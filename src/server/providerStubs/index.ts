import fs from 'fs';
import { PactStub } from '../types/pactTypes';
import ProviderStub from './ProviderStub';

const providerStubs: Record<string, ProviderStub> = {};

loadLocalPactStubFiles();

function loadPact(pact: PactStub, route: string): boolean {
  if (providerStubs[route]) {
    if (providerStubs[route].provider !== pact.provider.name) {
      console.log(`Error loading pact for ${route} <-> ${pact.provider}, unmatched provider ${providerStubs[route].provider} found`);
      return false;
    }

    providerStubs[route].interactions.concat(pact.interactions);
    return true;
  }

  providerStubs[route] = new ProviderStub(pact.provider.name, pact.interactions);
  return true;
}

function loadLocalPactStubFiles() {
  fs.readFile('stubs/sample.json', (err, data) => {
    if (err) throw err;
    const pact: PactStub = JSON.parse(data.toString());
    loadPact(pact, 'zoo');
  });
}

function addStateForProviderByRoute(state: string, route: string) {
  if (providerStubs[route]) {
    providerStubs[route].activeStates.push(state);
  }
}

function getProviderStubMap() {
  return providerStubs;
}

function getProviderStubByRoute(route: string): ProviderStub {
  return providerStubs[route];
}

function getPotentialStatesForProvider(route: string) {
  const potentialStates: string[] = [];

  providerStubs[route].interactions.forEach((interaction) => {
    const state = interaction.provider_state;

    if (!potentialStates.includes(state)) {
      potentialStates.push();
    }
  });
}

function getProviderStates(route: string) {
  return providerStubs[route].activeStates;
}

export {
  getProviderStubMap, getProviderStubByRoute,
  loadPact, addStateForProviderByRoute,
  getProviderStates, getPotentialStatesForProvider,
};
